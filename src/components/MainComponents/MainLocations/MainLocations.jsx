import { BasicButton } from "../../primitivs/Button/Button";
import { SelectField } from "../../primitivs/Select/Select";
import styles from "./MainLocations.module.css";
import { useEffect, useState } from "react";
import { CardLocations } from "../../primitivs/CardLocations/CardLocations";
import { useNavigate } from "react-router-dom";
import { data } from "./constants";
import logoGeneral from "../../../assets/svg/rick-and-morty 1.svg";
import { ModalFiltersButton } from "../../primitivs/ModalFiltersButton/ModalFiltersButton";
import { responsePage } from "../../../api/ResponsePage";
import { TextFieldComponent } from "../../primitivs/TextField/TextField";

export const MainLocations = () => {
  const PREVIEW_VALUE_STEP = 12;

  const [filters, setFilters] = useState({ type: "", dimension: "" });
  const [renderLocations, setRenderLocations] = useState(PREVIEW_VALUE_STEP);
  const [locations, setLocations] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setLocations([]);
    setSearchText(event.target.value);
  };
  const handleSelectChange = (event) => {
    setLocations([]);
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };
  const handleClick = () => {
    if (renderLocations > locations.length) {
      setPage((prev) => prev + 1);
    }
    setRenderLocations((prev) => prev + PREVIEW_VALUE_STEP);
  };

  const getLocationsPage = async () => {
    const path = "location";
    try {
      const response = await responsePage(path, page, searchText, filters);
      setLocations((prevLocations) => [
        ...prevLocations,
        ...response.data.results,
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLocationsPage();
  }, [page, searchText, filters]);

  const renderCardComponents = () => {
    return locations
      .slice(0, renderLocations)
      .map(({ type, name, id }) => (
        <CardLocations
          onClick={() => navigate(`/locations/${id}`)}
          type={type}
          name={name}
          key={id}
        />
      ));
  };

  return (
    <main className={styles.main}>
      <img className={styles.logoSection} src={logoGeneral} alt="Логотип" />
      <div className={styles.filtersSection}>
        <TextFieldComponent
          sx={{ maxWidth: 326, width: "100%" }}
          label={"Filter by name..."}
          onChange={handleInputChange}
        />
        <ModalFiltersButton className={styles.modalButton}>
          <div className={styles.modalFilters}>
            <span className={styles.spanModalSection}>Filters</span>
            <SelectField
              value={filters.type}
              name="type"
              onChange={handleSelectChange}
              data={data[0]}
            />
            <SelectField
              value={filters.dimension}
              name="dimension"
              onChange={handleSelectChange}
              data={data[1]}
            />
          </div>
        </ModalFiltersButton>
        <SelectField
          className={styles.select}
          value={filters.type}
          name="type"
          onChange={handleSelectChange}
          data={data[0]}
        />
        <SelectField
          className={styles.select}
          value={filters.dimension}
          name="dimension"
          onChange={handleSelectChange}
          data={data[1]}
        />
      </div>
      <div className={styles.cardsSection}>{renderCardComponents()}</div>
      <div className={styles.buttonSection}>
        <BasicButton onClick={handleClick} className={styles.button}>
          Load More
        </BasicButton>
      </div>
    </main>
  );
};
