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
import {
  renderCardsAction,
  setFiltersAction,
  setPageAction,
  setSearchTextAction,
} from "../../../store/reducers/charactersPageReducer";
import { useGetLocationsQuery } from "../../../store/services/rickAndMortyApi";

export const MainLocations = () => {
  const dispatch = useDispatch();

  const filters = useSelector((state) => state.charactersPage.filters);
  const setFilters = (payload) => dispatch(setFiltersAction(payload));

  const renderLocations = useSelector((state) => state.charactersPage.renderCards);
  const setRenderLocations = () => dispatch(renderCardsAction());

  const searchText = useSelector((state) => state.charactersPage.searchText);
  const setSearchText = (payload) => dispatch(setSearchTextAction(payload));

  const page = useSelector((state) => state.charactersPage.page);
  const nextPageAction = () => dispatch(setPageAction());

  const { data: dataLocations, isLoading } = useGetLocationsQuery({ page, searchText, filters });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };
  const handleSelectChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };
  const handleClick = () => {
    if (renderLocations > dataLocations.results.length) {
      nextPageAction();
    }
    setRenderLocations();
  };

  const renderCardComponents = () => {
    if (isLoading) {
      return null;
    }
    return dataLocations.results
      .slice(0, renderLocations)
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
