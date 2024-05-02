import styles from "./MainEpisodes.module.css";
import logoGeneral from "../../../assets/svg/rick-and-morty2 1.svg";
import { BasicButton } from "../../UI/Button/Button";
import { CardEpisodes } from "../../UI/CardEpisodes/CardEpisodes";
import { useNavigate } from "react-router-dom";
import { TextFieldComponent } from "../../UI/TextField/TextField";
import { useDispatch, useSelector } from "react-redux";
import { useGetEpisodesQuery } from "../../../store/services/rickAndMortyApi";
import { StateSlice } from "../../../store/reducers/charactersPageReducer";
import { LoadingComponent } from "../../UI/LoadingComponent/LoadingComponent";

export const MainEpisodes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { searchText, page, renderCards } = useSelector((state) => state.reducer);
  const { setSearchText, setPage, setRenderCards } = StateSlice.actions;

  const { data: dataEpisodes, isLoading } = useGetEpisodesQuery({
    page,
    searchText,
  });

  const handleInputChange = (event) => {
    dispatch(setSearchText(event.target.value));
  };
  const handleClick = () => {
    if (renderCards > dataEpisodes.results.length) {
      dispatch(setPage());
    }
    dispatch(setRenderCards());
  };

  const renderCardComponents = () => {
    return (
      dataEpisodes &&
      dataEpisodes.results
        .slice(0, renderCards)
        .map(({ name, air_date, episode, id }) => (
          <CardEpisodes
            onClick={() => navigate(`/episodes/${id}`)}
            className={styles.card}
            name={name}
            air_date={air_date}
            episode={episode}
            key={id}
          />
        ))
    );
  };

  if (isLoading) {
    return <LoadingComponent />;
  }
  return (
    <main className={styles.main}>
      <img className={styles.logoSection} src={logoGeneral} alt="Логотип" />
      <div className={styles.filtersSection}>
        <TextFieldComponent
          sx={{
            maxWidth: 500,
            width: "100%",
            marginLeft: "10%",
            marginRight: "10%",
          }}
          label={"Filter by name or episode (ex. S01 or S01E02)"}
          onChange={handleInputChange}
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
