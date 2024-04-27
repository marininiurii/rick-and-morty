import styles from "./MainLocations.module.css";
import logoGeneral from "../../../assets/svg/rick-and-morty 1.svg";
import { data } from "./constants";
import { BasicButton } from "../../primitivs/Button/Button";
import { SelectField } from "../../primitivs/Select/Select";
import { CardLocations } from "../../primitivs/CardLocations/CardLocations";
import { useNavigate } from "react-router-dom";
import { ModalFiltersButton } from "../../primitivs/ModalFiltersButton/ModalFiltersButton";
import { TextFieldComponent } from "../../primitivs/TextField/TextField";
import { useDispatch, useSelector } from "react-redux";
import { useGetLocationsQuery } from "../../../store/services/rickAndMortyApi";
import { Slice } from "../../../store/reducers/charactersPageReducer";

export const MainLocations = () => {
  const dispatch = useDispatch();

  const { page, filters, renderCards, searchText } = useSelector(
    (state) => state.charactersPage
  );
  const { setPage, setFilters, setRenderCards, setSearchText } = Slice.actions;

  const { data: dataLocations, isLoading } = useGetLocationsQuery({
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
    if (renderCards > dataLocations.results.length) {
      dispatch(setPage());
    }
    dispatch(setRenderCards());
  };

  const renderCardComponents = () => {
    if (isLoading) {
      return null;
    }
    return dataLocations.results
      .slice(0, renderCards)
      .map(({ type, name, id }) => (
        <CardLocations
          onClick={() => navigate(`/locations/${id}`)}
          type={type}
          name={name}
          key={id}
        />
      ));
  };

  const selectsNames = ["type", "dimension"];
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
          sx={{ maxWidth: 326, width: "100%" }}
          label={"Filter by name..."}
          onChange={handleInputChange}
        />
        <ModalFiltersButton className={styles.modalButton}>
          <div className={styles.modalFilters}>
            <span className={styles.spanModalSection}>Filters</span>
            {renderSelects("")}
          </div>
        </ModalFiltersButton>
        {renderSelects(styles.select)}
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
