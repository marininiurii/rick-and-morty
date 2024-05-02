import styles from "./MainCharacters.module.css";
import logoGeneral from "../../../assets/svg/logo-general.svg";
import { dataSelects } from "./constants";
import { SelectField } from "../../UI/Select/Select";
import { CardCharacters } from "../../UI/CardCharacters/CardCharacters";
import { BasicButton } from "../../UI/Button/Button";
import { useNavigate } from "react-router-dom";
import { ModalFiltersButton } from "../../UI/ModalFiltersButton/ModalFiltersButton";
import { TextFieldComponent } from "../../UI/TextField/TextField";
import { useDispatch, useSelector } from "react-redux";
import { useGetCharactersQuery } from "../../../store/services/rickAndMortyApi";
import { StateSlice } from "../../../store/reducers/charactersPageReducer";
import { LoadingComponent } from "../../UI/LoadingComponent/LoadingComponent";

export const MainCharacters = () => {
  const selectsNames = ["species", "gender", "status"];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { page, filters, renderCharacters, searchText } = useSelector(
    (state) => state.reducer
  );
  const { setPage, setFilters, setRenderCharacters, setSearchText } = StateSlice.actions;
  const { data: dataCharacters, isLoading } = useGetCharactersQuery({
    page,
    searchText,
    filters,
  });

  const handleInputChange = (event) => {
    dispatch(setSearchText(event.target.value));
  };
  const handleSelectChange = (event) => {
    dispatch(setFilters({ ...filters, [event.target.name]: event.target.value }));
  };
  const handleClick = () => {
    if (renderCharacters >= dataCharacters.results.length) {
      dispatch(setPage());
    }
    dispatch(setRenderCharacters());
  };

  const renderCardComponents = () => {
    return (
      dataCharacters &&
      dataCharacters.results
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
        })
    );
  };

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
  if (isLoading) {
    return <LoadingComponent />;
  }
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
