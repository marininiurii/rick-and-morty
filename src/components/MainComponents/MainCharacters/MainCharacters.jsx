import styles from "./MainCharacters.module.css";
import logoGeneral from "../../../assets/svg/logo-general.svg";
import { data } from "./constants";
import { SelectField } from "../../primitivs/Select/Select";
import { CardCharacters } from "../../primitivs/CardCharacters/CardCharacters";
import { BasicButton } from "../../primitivs/Button/Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { responsePage } from "../../../api/ResponsePage";
import { ModalFiltersButton } from "../../primitivs/ModalFiltersButton/ModalFiltersButton";
import { TextFieldComponent } from "../../primitivs/TextField/TextField";

export const MainCharacters = () => {
  const PREVIEW_VALUE_STEP = 8;
  const PAGE_VALUE_STEP = 1;

  const [filters, setFilters] = useState({
    type: "",
    status: "",
    species: "",
    gender: "",
  });
  const [characters, setCharacters] = useState([]);
  const [renderCharacters, setRenderCharacters] = useState(PREVIEW_VALUE_STEP);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(PAGE_VALUE_STEP);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setCharacters([]);
    setSearchText(event.target.value);
  };
  const handleSelectChange = (event) => {
    setCharacters([]);
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };
  const handleClick = () => {
    if (renderCharacters > characters.length) {
      setPage((prev) => prev + PAGE_VALUE_STEP);
    }
    setRenderCharacters((prev) => prev + PREVIEW_VALUE_STEP);
  };

  const getCharactersPage = async () => {
    const path = "character";
    try {
      const response = await responsePage(path, page, searchText, filters);
      setCharacters((prevCharacters) => [
        ...prevCharacters,
        ...response.data.results,
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCharactersPage();
  }, [page, searchText, filters]);

  const renderCardComponents = () => {
    return characters
      .slice(0, renderCharacters)
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

  const selectsNames = ["species", "gender", "status"];
  const renderSelects = (className) =>
    selectsNames.map((selectName, index) => (
      <SelectField
        className={className}
        value={filters[selectName]}
        name={selectName}
        onChange={handleSelectChange}
        data={data[index]}
        key={selectName}
      />
    ));

  return (
    <main className={styles.main}>
      <img className={styles.logoSection} src={logoGeneral} alt="Логотип" />
      <div className={styles.filtersSection}>
        <TextFieldComponent
          sx={{ width: 240 }}
          label={"Filter by name..."}
          onChange={handleInputChange}
        />
        <ModalFiltersButton className={styles.modalButton}>
          <div className={styles.modalFilters}>
            <span className={styles.spanModalSection}>Filters</span>
            {renderSelects("")}
          </div>
        </ModalFiltersButton>
        {renderSelects(styles.selects)}
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
