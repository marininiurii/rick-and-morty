import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import s from "./MainCharactersDetails.module.css";

export const MainCharactersDetails = () => {
    const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://rickandmortyapi.com/api/character/${id}`
        );
        // setState([...initialState, ...response.data.results]);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className={s.main}>
      <div className={s.headSection}>
        <div className={s.goBack}>
          <img src="./public/images/back.svg" alt="back" />
          <a href="#"></a>
        </div>
        <div className={s.logoSection}>
          <img src="#" alt="Логотип" />
          <h1>#</h1>
        </div>
      </div>
      <div className={s.infoSection}>
        <div className={s.informations}></div>
        <div className={s.episodes}></div>
      </div>
    </div>
  );
};
