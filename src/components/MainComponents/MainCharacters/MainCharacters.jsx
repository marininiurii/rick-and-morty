import styles from "./MainCharacters.module.css";
import logoGeneral from "../../../assets/svg/logo-general.svg";
import { dataSelects } from "./constants";
import { SelectField } from "../../primitivs/Select/Select";
import { CardCharacters } from "../../primitivs/CardCharacters/CardCharacters";
import { BasicButton } from "../../primitivs/Button/Button";
import { useNavigate } from "react-router-dom";
import { ModalFiltersButton } from "../../primitivs/ModalFiltersButton/ModalFiltersButton";
import { TextFieldComponent } from "../../primitivs/TextField/TextField";
import { useDispatch, useSelector } from "react-redux";
import { useGetCharactersQuery } from "../../../store/services/rickAndMortyApi";
import { Slice } from "../../../store/reducers/charactersPageReducer";

export const MainCharacters = () => {
  const dispatch = useDispatch();

  const { page, filters, renderCharacters, searchText } = useSelector(
    (state) => state.charactersPage
  );
  const { setPage, setFilters, setRenderCharacters, setSearchText } =
    Slice.actions;

  const { data: dataCharacters, isLoading } = useGetCharactersQuery({
    page,
    searchText,
    filters,
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    dispatch(setSearchText(event.target.value));
  };
  const handleSelectChange = (event) => {
    dispatch(
      setFilters({ ...filters, [event.target.name]: event.target.value })
    );
  };

  const handleClick = () => {
    if (renderCharacters > dataCharacters.results.length) {
      dispatch(setPage());
    }
    dispatch(setRenderCharacters());
  };
  const renderCardComponents = () => {
    if (isLoading) {
      return null;
    }
    return dataCharacters.results
      .slice(0, renderCharacters)
      .map(({ image, name, species, id }) => {
        const props = {
          onClick: () => navigate(`/characters/${id}`),
          image: image,
          name: name,
          species: species,
          key: id,
        };
        return <CardCharacters {...props} />;
      });
  };

  const selectsNames = ["species", "gender", "status"];
  const renderSelects = (className) =>
    selectsNames.map((selectName, index) => (
      <SelectField
        className={className}
        value={filters[selectName]}
        name={selectName}
        onChange={handleSelectChange}
        data={dataSelects[index]}
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
