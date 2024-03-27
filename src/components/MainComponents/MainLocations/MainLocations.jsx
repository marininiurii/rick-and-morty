import { TextField } from "@mui/material";
import { BasicButton } from "../../primitivs/Button/Button";
import { SelectField } from "../../primitivs/Select/Select";
import s from "./MainLocations.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { CardLocations } from "../../primitivs/CardLocations/CardLocations";
import { Link } from "react-router-dom";

export const MainLocations = () => {
  const [filters, setFilters] = useState({ type: "", dimension: "" });
  const [initialState, setState] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loadComponents, setLoadComponents] = useState(8);
  const [page, setPage] = useState(1);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://rickandmortyapi.com/api/location/?page=${page}`
        );
        setState([...initialState, ...response.data.results]);
        console.log(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [page]);

  const renderCardComponents = () => {
    const filteredComponents = initialState.filter(({ name }) =>
      name.toLowerCase().includes(searchText.toLowerCase())
    );

    return filteredComponents
      .map(({ type, dimension, id }, i) => (
        <Link className={s.link} to={`/locations/${id}`}>
        <CardLocations type={type} dimension={dimension} key={i} />
        </Link>
      ))
      .slice(0, loadComponents);
  };

  return (
    <main className={s.main}>
      <div className={s.logoSection}>
        <img src="./rick-and-morty 1.svg" alt="Логотип" />
      </div>
      <div className={s.filtersSection}>
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
          data={{
            items: [
              "Planet",
              "Cluster",
              "Space station",
              "Microverse",
              "Fantasy town",
            ],
            label: "Type",
          }}
        ></SelectField>
        <SelectField
          value={filters.dimension}
          name="Dimension"
          onChange={handleSelectChange}
          data={{
            items: [
              "Dimension C-137",
              "Fantasy Dimension",
              "Dimension 5-126",
              "Replacement Dimension",
              "Post-Apocalyptic Dimension",
              "Cronenberg Dimension",
            ],
            label: "Dimension",
          }}
        ></SelectField>
      </div>
      <div className={s.cardsSection}>
        {renderCardComponents()}
      </div>
      <div className={s.buttonSection}>
      <BasicButton onClick={handleClick} className={s.button}>Load More</BasicButton>
      </div>
    </main>
  );
};
