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
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setEpisodes([]);
    setSearchText(event.target.value);
  };
  const handleClick = () => {
    if (renderEpisodes > episodes.length) {
      setPage((prev) => prev + 1)
    }
    setRenderEpisodes((prev) => prev + PREVIEW_VALUE_STEP)
  };

  const getEpisodesPage = async () => {
    const path = "episode";
    const filters = {}
    try {
      const response = await responsePage(path, page, searchText, filters);
      setEpisodes((prevEpisodes) => [...prevEpisodes, ...response.data.results]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEpisodesPage();
  }, [page, searchText]);
console.log('episodes :>> ', episodes);
  const renderCardComponents = () => {
    return episodes
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
      ))
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
