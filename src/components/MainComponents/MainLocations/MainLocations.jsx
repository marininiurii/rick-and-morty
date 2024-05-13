import styles from "./MainLocations.module.css";
import logoGeneral from "../../../assets/svg/rick-and-morty 1.svg";
import { SELECTS_NAMES, data } from "./constants";
import { BasicButton } from "../../ui/Button/Button";
import { SelectField } from "../../ui/Select/Select";
import { CardLocations } from "../../ui/CardLocations/CardLocations";
import { useNavigate } from "react-router-dom";
import { ModalFiltersButton } from "../../ui/ModalFiltersButton/ModalFiltersButton";
import { useDispatch, useSelector } from "react-redux";
import { useGetLocationsQuery } from "../../../store/services/rickAndMortyApi";
import { StateSlice } from "../../../store/reducers/charactersPageReducer";
import { LoadingComponent } from "../../ui/LoadingComponent/LoadingComponent";
import { CustomTextField } from "../../ui/CustomTextField/CustomTextField";

export const MainLocations = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { page, filters, numberRenderedCards, searchText } = useSelector(
    (state) => state.reducer
  );
  const { setPage, setFilters, setNumberRenderedCards, setSearchText } =
    StateSlice.actions;

  const { data: dataLocations, isLoading } = useGetLocationsQuery({
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
  const handleClickLoadMore = () => {
    if (numberRenderedCards > dataLocations.results.length) {
      dispatch(setPage());
    }
    dispatch(setNumberRenderedCards());
  };

  const renderCardComponents = () => {
    return (
      dataLocations &&
      dataLocations.results
        .slice(0, numberRenderedCards)
        .map(({ type, name, id }) => (
          <CardLocations
            onClick={() => navigate(`/locations/${id}`)}
            type={type}
            name={name}
            key={id}
          />
        ))
    );
  };

  const renderSelects = (className) =>
    SELECTS_NAMES.map((selectName, index) => (
      <SelectField
        className={className}
        value={filters[selectName]}
        name={selectName}
        onChange={handleSelectChange}
        data={data[index]}
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
        <CustomTextField
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
        <BasicButton onClick={handleClickLoadMore} className={styles.button}>
          Load More
        </BasicButton>
      </div>
    </main>
  );
};
