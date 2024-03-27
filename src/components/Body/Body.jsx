import { SelectField } from "../primitivs/Select/Select";
import { CardComponent } from "../primitivs/Card/Card";
import s from "./Body.module.css";
import TextField from "@mui/material/TextField";
import { BasicButton } from "../primitivs/Button/Button";
import axios from "axios";
import { useState, useEffect } from "react";

export const Body = ({ children }) => {
  const [filters, setFilters] = useState({ type: "", status: "", species: "", gender: "" });
  const [initialState, setState] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loadComponents, setLoadComponents] = useState(8)
  const [page, setPage] = useState(1)


  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };
  const handleSelectChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };
  const handleClick = () => {
    if (loadComponents < 20) {
      setLoadComponents(prev => prev + 8)
    } 
    
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(page)
        const response = await axios.get(
          `https://rickandmortyapi.com/api/character/?page=${page}`
        );
        setState(response.data.results);
        console.log(response.data.results);
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const renderCardComponents = () => {
    const filteredComponents = initialState.filter(({ name }) =>
      name.toLowerCase().includes(searchText.toLowerCase())
    );

    return filteredComponents
      .map(({ image, name, species }, i) => (
        <CardComponent image={image} name={name} species={species} key={i} />
      ))
      .slice(0, loadComponents);
  };

  return (
    <main className={s.main}>
      <div className={s.logoSection}>{children}</div>
      <div className={s.filtersSection}>
        <TextField
          id="outlined-basic"
          label="Filter by name"
          variant="outlined"
          onChange={handleInputChange}
        />
        <SelectField
          value={filters.species}
          name="species"
          onChange={handleSelectChange}
          data={{ items: ["Human", "Alien"], label: "Species" }}
        ></SelectField>
        <SelectField
          value={filters.gender}
          name="gender"
          onChange={handleSelectChange}
          data={{ items: ["Male", "Female"], label: "Gender" }}
        ></SelectField>
        <SelectField
          value={filters.status}
          name="status"
          onChange={handleSelectChange}
          data={{ items: ["Alive", "Dead"], label: "Status" }}
        ></SelectField>
      </div>
      <div className={s.cardsSection}>{renderCardComponents()}</div>
      <div className={s.buttonSection}>
        <BasicButton onClick={handleClick}>Load More</BasicButton>
      </div>
    </main>
  );
};
