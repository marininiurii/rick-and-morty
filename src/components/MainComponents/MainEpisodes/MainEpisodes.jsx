import styles from "./MainEpisodes.module.css";
import TextField from "@mui/material/TextField";
import { BasicButton } from "../../primitivs/Button/Button";
import { useState, useEffect } from "react";
import { CardEpisodes } from "../../primitivs/CardEpisodes/CardEpisodes";
import { responseEpisodePage } from "../../../api/ResponseEpisodesPage";
import logoGeneral from "../../../assets/svg/rick-and-morty2 1.svg";

export const MainEpisodes = () => {
  const [state, setState] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loadComponents, setLoadComponents] = useState(8);
  const [page, setPage] = useState(1);

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };
  const handleClick = () => {
    if (loadComponents < 20) {
      setLoadComponents((prev) => prev + 8);
    } else {
      setPage((prev) => prev + 1);
      setLoadComponents((prev) => prev + 8);
    }
  };

  useEffect(() => {
    responseEpisodePage(state, setState, page);
  }, [page]);

  const renderCardComponents = () => {
    const filteredComponents = state.filter(({ name }) =>
      name.toLowerCase().includes(searchText.toLowerCase())
    );

    return filteredComponents
      .map(({ name, air_date, episode }, i) => (
        <CardEpisodes
          className={styles.card}
          name={name}
          air_date={air_date}
          episode={episode}
          key={i}
        />
      ))
      .slice(0, loadComponents);
  };

  return (
    <main className={styles.main}>
      <div className={styles.logoSection}>
        <img src={logoGeneral} alt="Логотип" />
      </div>
      <div className={styles.filtersSection}>
        <TextField
          sx={{ minWidth: 500 }}
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
