import styles from "./MainEpisodes.module.css";
import logoGeneral from "../../../assets/svg/rick-and-morty2 1.svg";
import { BasicButton } from "../../primitivs/Button/Button";
import { CardEpisodes } from "../../primitivs/CardEpisodes/CardEpisodes";
import { useNavigate } from "react-router-dom";
import { TextFieldComponent } from "../../primitivs/TextField/TextField";
import { useDispatch, useSelector } from "react-redux";
import {
  renderCardsAction,
  setPageAction,
  setSearchTextAction,
} from "../../../store/reducers/charactersPageReducer";
import { useGetEpisodesQuery } from "../../../store/services/rickAndMortyApi";

export const MainEpisodes = () => {
  const dispatch = useDispatch();

  const searchText = useSelector((state) => state.charactersPage.searchText);
  const setSearchText = (payload) => dispatch(setSearchTextAction(payload));

  const page = useSelector((state) => state.charactersPage.page);
  const nextPageAction = () => dispatch(setPageAction());

  const renderEpisodes = useSelector((state) => state.charactersPage.renderCards);
  const setRenderEpisodes = () => dispatch(renderCardsAction());

  const { data: dataEpisodes, isLoading } = useGetEpisodesQuery({ page, searchText });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };
  const handleClick = () => {
    if (renderEpisodes > dataEpisodes.results.length) {
      nextPageAction();
    }
    setRenderEpisodes();
  };

  const renderCardComponents = () => {
    if (isLoading) {
      return null;
    }
    return dataEpisodes.results
      .slice(0, renderEpisodes)
      .map(({ name, air_date, episode, id }) => (
        <CardEpisodes
          onClick={() => navigate(`/episodes/${id}`)}
          className={styles.card}
          name={name}
          air_date={air_date}
          episode={episode}
          key={id}
        />
      ));
  };

  return (
    <main className={styles.main}>
      <img className={styles.logoSection} src={logoGeneral} alt="Логотип" />
      <div className={styles.filtersSection}>
        <TextFieldComponent
          sx={{ maxWidth: 500, width: "100%", marginLeft: "10%", marginRight: "10%" }}
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
