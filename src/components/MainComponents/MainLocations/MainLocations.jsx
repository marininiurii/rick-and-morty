import { TextField } from "@mui/material";
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

export const MainLocations = () => {
  const [filters, setFilters] = useState({ type: "", dimension: "" });
  const [renderLocations, setRenderLocations] = useState(8);
  const [locations, setLocations] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loadComponents, setLoadComponents] = useState(8);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setLocations([]);
    setPage(0);
    setSearchText(event.target.value);
  };
  const handleSelectChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };
  const handleClick = () => {
    if (loadComponents < 8) {
      setRenderLocations((prev) => prev + 8);
      setLoadComponents((prev) => prev + 8);
    } else {
      if (loadComponents < 20) setPage((prev) => prev + 1);
      setLoadComponents(0);
      setRenderLocations((prev) => prev + 8);
    }
  };

  const getLocationsPage = async () => {
    const path = "location";
    try {
      const response = await responsePage(path, page, searchText);
      setLocations([...locations, ...response.data.results]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLocationsPage(searchText);
  }, [page, searchText]);

  const renderCardComponents = () => {
    return locations
      .map(({ type, name, id }) => (
        <CardLocations
          onClick={() => navigate(`/locations/${id}`)}
          type={type}
          name={name}
          key={id}
        />
      ))
      .slice(0, renderLocations);
  };

  return (
    <main className={styles.main}>
      <img className={styles.logoSection} src={logoGeneral} alt="Логотип" />
      <div className={styles.filtersSection}>
        <TextField
          sx={{ minWidth: 312 }}
          id="outlined-basic"
          label="Filter by name"
          variant="outlined"
          onChange={handleInputChange}
        />
        <ModalFiltersButton className={styles.modalButton}>
          <div className={styles.modalFilters}>
            <span className={styles.spanModalSection}>Filters</span>
            <SelectField
              value={filters.type}
              name="Type"
              onChange={handleSelectChange}
              data={data[0]}
            />
            <SelectField
              value={filters.dimension}
              name="Dimension"
              onChange={handleSelectChange}
              data={data[1]}
            />
          </div>
        </ModalFiltersButton>
        <SelectField
          className={styles.select}
          value={filters.type}
          name="Type"
          onChange={handleSelectChange}
          data={data[0]}
        />
        <SelectField
          className={styles.select}
          value={filters.dimension}
          name="Dimension"
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
