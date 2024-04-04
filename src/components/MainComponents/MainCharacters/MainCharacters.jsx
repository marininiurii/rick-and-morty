import { SelectField } from "../../primitivs/Select/Select";
import { CardCharacters } from "../../primitivs/CardCharacters/CardCharacters";
import styles from "./MainCharacters.module.css";
import TextField from "@mui/material/TextField";
import { BasicButton } from "../../primitivs/Button/Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { responsePage } from "../../../api/ResponsePage";
import { data } from "./constants";
import logoGeneral from "../../../assets/svg/logo-general.svg";
import { ModalFiltersButton } from "../../primitivs/ModalFiltersButton/ModalFiltersButton";

export const MainCharacters = () => {
  const PREVIEW_VALUE_STEP = 8;

  const [filters, setFilters] = useState({
    type: "",
    status: "",
    species: "",
    gender: "",
  });
  const [characters, setCharacters] = useState([]);
  const [renderCharacters, setRenderCharacters] = useState(PREVIEW_VALUE_STEP);
  const [searchText, setSearchText] = useState("");
  const [loadComponents, setLoadComponents] = useState(PREVIEW_VALUE_STEP);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setCharacters([]);
    setPage(0);
    setSearchText(event.target.value);
  };
  const handleSelectChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };
  const handleClick = () => {
    setRenderCharacters((prev) => prev + PREVIEW_VALUE_STEP);
    setLoadComponents((prev) => prev + PREVIEW_VALUE_STEP);
  };

  const getCharactersPage = async () => {
    const path = "character";
    try {
      const response = await responsePage(path, page, searchText);
      setCharacters([...characters, ...response.data.results]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (renderCharacters > 20) {
      setRenderCharacters(0);
      setPage((prev) => prev + 1);
    }
    getCharactersPage(page, searchText);
  }, [page, searchText]);

  const renderCardComponents = () => {
    return characters
      .slice(0, loadComponents)
      .map(({ image, name, species, id }) => (
        <CardCharacters
          onClick={() => navigate(`/characters/${id}`)}
          className={styles.card}
          image={image}
          name={name}
          species={species}
          key={id}
        />
      ));
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
        </ModalFiltersButton>
        <SelectField
          className={styles.select}
          value={filters.species}
          name="species"
          onChange={handleSelectChange}
          data={data[0]}
        />
        <SelectField
          className={styles.select}
          value={filters.gender}
          name="gender"
          onChange={handleSelectChange}
          data={data[1]}
        />
        <SelectField
          className={styles.select}
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
