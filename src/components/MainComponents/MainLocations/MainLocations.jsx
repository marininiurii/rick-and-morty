import { TextField } from "@mui/material";
import { BasicButton } from "../../primitivs/Button/Button";
import { SelectField } from "../../primitivs/Select/Select";
import styles from "./MainLocations.module.css";
import { useEffect, useState } from "react";
import { CardLocations } from "../../primitivs/CardLocations/CardLocations";
import { Link, useNavigate } from "react-router-dom";
import { responseLocationsPage } from "../../../api/ResponseLocationsPage";
import { data } from "./constants";
import logoGeneral from "../../../assets/svg/rick-and-morty 1.svg";

export const MainLocations = () => {
  const [filters, setFilters] = useState({ type: "", dimension: "" });
  const [locations, setLocations] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loadComponents, setLoadComponents] = useState(8);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };
  const handleSelectChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };
  const handleClick = () => {
    if (loadComponents < 20) {
      setLoadComponents((prev) => prev + 8);
    } else {
      setPage((prev) => prev + 1);
      setLoadComponents((prev) => prev + 8);
    }
  };

  const getLocationsPage = async () => {
    try {
      const response = await responseLocationsPage(page);
      setLocations(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLocationsPage();
  }, [page]);

  const renderCardComponents = () => {
    const filteredComponents = locations.filter(({ name }) =>
      name.toLowerCase().includes(searchText.toLowerCase())
    );

    return filteredComponents
      .map(({ type, dimension, id }) => (
        <CardLocations
          onClick={() => navigate(`/locations/${id}`)}
          type={type}
          dimension={dimension}
          key={id}
        />
      ))
      .slice(0, loadComponents);
  };

  return (
    <main className={styles.main}>
      <div className={styles.logoSection}>
        <img src={logoGeneral} alt="Логотип" />
      </div>
      <div className={styles.filtersSection}>
        <TextField
          id="outlined-basic"
          label="Filter by name"
          variant="outlined"
          onChange={handleInputChange}
        />
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
      <div className={styles.cardsSection}>{renderCardComponents()}</div>
      <div className={styles.buttonSection}>
        <BasicButton onClick={handleClick} className={styles.button}>
          Load More
        </BasicButton>
      </div>
    </main>
  );
};
