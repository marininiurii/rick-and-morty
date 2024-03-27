import s from "./MainEpisodes.module.css";
import TextField from "@mui/material/TextField";
import { BasicButton } from "../../primitivs/Button/Button";
import axios from "axios";
import { useState, useEffect } from "react";
import { CardEpisodes } from "../../primitivs/CardEpisodes/CardEpisodes";

export const MainEpisodes = () => {
  const [initialState, setState] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loadComponents, setLoadComponents] = useState(8)
  const [page, setPage] = useState(1)


  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };
  const handleClick = () => {
    if (loadComponents < 20) {
      setLoadComponents(prev => prev + 8)
    } else {
      setPage(prev => prev + 1)
      setLoadComponents(prev => prev + 8)
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://rickandmortyapi.com/api/episode/?page=${page}`
        );
        setState([...initialState, ...response.data.results]);
            console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [page]);

  const renderCardComponents = () => {
    const filteredComponents = initialState.filter(({ name }) =>
      name.toLowerCase().includes(searchText.toLowerCase())
    );

    return filteredComponents
      .map(({ name, air_date, episode }, i) => (
        <CardEpisodes className={s.card} name={name} air_date={air_date} episode={episode} key={i} />
      ))
      .slice(0, loadComponents);
  };

  return (
    <main className={s.main}>
      <div className={s.logoSection}>
        <img src="./rick-and-morty2 1.svg" alt="Логотип" />
      </div>
      <div className={s.filtersSection}>
        <TextField
        sx={{minWidth: 500}}
          id="outlined-basic"
          label="Filter by name or episode (ex. S01 or S01E02)"
          variant="outlined"
          onChange={handleInputChange}
        />
      </div>
      <div className={s.cardsSection}>{renderCardComponents()}</div>
      <div className={s.buttonSection}>
        <BasicButton onClick={handleClick} className={s.button}>Load More</BasicButton>
      </div>
    </main>
  );
};
