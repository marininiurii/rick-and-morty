import styles from "./MainEpisodes.module.css";
import TextField from "@mui/material/TextField";
import { BasicButton } from "../../primitivs/Button/Button";
import { useState, useEffect } from "react";
import { CardEpisodes } from "../../primitivs/CardEpisodes/CardEpisodes";
import logoGeneral from "../../../assets/svg/rick-and-morty2 1.svg";
import { useNavigate } from "react-router-dom";
import { responsePage } from "../../../api/ResponsePage";

export const MainEpisodes = () => {
  const PREVIEW_VALUE_STEP = 8;

  const [episodes, setEpisodes] = useState([]);
  const [renderEpisodes, setRenderEpisodes] = useState(PREVIEW_VALUE_STEP);
  const [searchText, setSearchText] = useState("");
  const [loadComponents, setLoadComponents] = useState(PREVIEW_VALUE_STEP);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setEpisodes([]);
    setPage(0);
    setSearchText(event.target.value);
  };
  const handleClick = () => {
    if (loadComponents < 8) {
      setLoadComponents((prev) => prev + 8);
      setRenderEpisodes((prev) => prev + 8);
    } else {
      if (loadComponents < 20) setPage((prev) => prev + 1);
      setLoadComponents(0);
      setRenderEpisodes((prev) => prev + 8);
    }
  };

  const getEpisodesPage = async (searchText) => {
    const path = "episode";
    try {
      const response = await responsePage(path, page, searchText);
      setEpisodes([...episodes, ...response.data.results]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEpisodesPage(searchText);
  }, [page, searchText]);

  const renderCardComponents = () => {
    return episodes
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
      .slice(0, renderEpisodes);
  };

  return (
    <main className={styles.main}>
      <img className={styles.logoSection} src={logoGeneral} alt="Логотип" />
      <div className={styles.filtersSection}>
        <TextField
          sx={{ width: 500, margin: "0 5% 0 5%" }}
          id="outlined-basic"
          label="Filter by name or episode (ex. S01 or S01E02)"
          variant="outlined"
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
