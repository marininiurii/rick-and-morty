import { SelectField } from "../../primitivs/Select/Select";
import { CardCharacters } from "../../primitivs/CardCharacters/CardCharacters";
import styles from "./MainCharacters.module.css";
import TextField from "@mui/material/TextField";
import { BasicButton } from "../../primitivs/Button/Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { responseCharactersPage } from "../../../api/ResponseCharactersPage";
import { data } from "./constants";
import logoGeneral from "../../../assets/svg/logo-general.svg";

export const MainCharacters = () => {
  const [filters, setFilters] = useState({
    type: "",
    status: "",
    species: "",
    gender: "",
  });
  const [characters, setCharacters] = useState([]);
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

  const getCharactersPage = async () => {
    try {
      const response = await responseCharactersPage(page);
      setCharacters(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCharactersPage();
  }, [page]);

  const renderCardComponents = () => {
    const filteredComponents = characters.filter(({ name }) =>
      name.toLowerCase().includes(searchText.toLowerCase())
    );

    return filteredComponents
      .map(({ image, name, species, id }) => (
        <CardCharacters
          onClick={() => navigate(`/characters/${id}`)}
          className={styles.card}
          image={image}
          name={name}
          species={species}
          key={id}
        />
      ))
      .slice(0, loadComponents);
  };

  return (
    <main className={styles.main}>
      <img className={styles.logoSection} src={logoGeneral} alt="Логотип" />
      <div className={styles.filtersSection}>
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
          data={data[0]}
        />
        <SelectField
          value={filters.gender}
          name="gender"
          onChange={handleSelectChange}
          data={data[1]}
        />
        <SelectField
          value={filters.status}
          name="status"
          onChange={handleSelectChange}
          data={data[2]}
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
