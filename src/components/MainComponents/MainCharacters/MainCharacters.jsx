import { SelectField } from "../../primitivs/Select/Select";
import { CardCharacters } from "../../primitivs/CardCharacters/CardCharacters";
import s from "./MainCharacters.module.css";
import TextField from "@mui/material/TextField";
import { BasicButton } from "../../primitivs/Button/Button";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const MainCharacters = () => {
  const [filters, setFilters] = useState({ type: "", status: "", species: "", gender: "" });
  const [initialState, setState] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loadComponents, setLoadComponents] = useState(8)
  const [page, setPage] = useState(1)
  const navigate = useNavigate()


  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };
  const handleSelectChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };
  const handleClick = () => {
    if (loadComponents < 20) {
      setLoadComponents(prev => prev + 8)
    } else {
      setPage(prev => prev + 1)
      setLoadComponents(prev => prev + 8)
    }
  };
  // const handleCharacterDetails = (id) => {
  //   navigate(`/characters/:${id}`)
  //   console.log(id);
  // }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://rickandmortyapi.com/api/character/?page=${page}`
        );
        setState([...initialState, ...response.data.results]);

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
      .map(({ image, name, species, id }, i) => (
        <CardCharacters onClick={() => navigate(`/characters/${id}`)} className={s.card} image={image} name={name} species={species} key={i} />
      ))
      .slice(0, loadComponents);
  };

  return (
    <main className={s.main}>
      <div className={s.logoSection}>
        <img src="./logo-general.svg" alt="Логотип" />
      </div>
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
        <BasicButton onClick={handleClick} className={s.button}>Load More</BasicButton>
      </div>
    </main>
  );
};
