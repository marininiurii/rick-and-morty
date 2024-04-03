import { useEffect, useState } from "react";
import { ArrowGoBack } from "../../primitivs/ArrowGoBack/ArrowGoBack";
import styles from "./MainEpisodesDetails.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { responseEpisodeDetails } from "../../../api/ResponseEpisodeDetails";
import { responseCharacterDetails } from "../../../api/ResponseCharacterDetails";
import { CardCharacters } from "../../primitivs/CardCharacters/CardCharacters";

export const MainEpisodesDetails = () => {
  const [episodeDetails, setEpisodeDetails] = useState({}); // объект с информацией об эпизоде
  const [episodeCharacters, setEpisodeCharacters] = useState([]); // массив объектов с информацией о персах
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const getEpisodeDetails = async () => {
    try {
      const response = await responseEpisodeDetails(id);
      await setEpisodeDetails(response.data); // episodeDetails детали конкретного эпизода.
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getEpisodesCharacters = async () => {
    try {
      const charactersId = await episodeDetails.characters.map(
        (url) => url.split("/").slice(-1)[0]
      );
      const responseCharactersEpisodesCards = await responseCharacterDetails(
        charactersId
      );
      await setEpisodeCharacters(responseCharactersEpisodesCards);
      console.log("episodeCharacters :>> ", episodeCharacters);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEpisodeDetails();
    getEpisodesCharacters();
  }, [loading]);

  const renderCharactersEpisode = () => {
    return episodeCharacters.map(({ image, name, species, id }) => {
      return (
        <CardCharacters
          onClick={() => navigate(`/characters/${id}`)}
          className={styles.card}
          image={image}
          name={name}
          species={species}
          key={id}
        />
      );
    });
  };

  return (
    <div className={styles.main}>
      <header className={styles.header}>
        <div className={styles.goBackSection}>
          <ArrowGoBack className={styles.arrow} href={"/episodes"} />
        </div>
        <div className={styles.headerSection}>
          <h1>{episodeDetails.name}</h1>
          <div className={styles.infoSection}>
            <div className={styles.spanContainer}>
              <span className={styles.spanHead}>Episode</span>
              <span className={styles.spanContent}>
                {episodeDetails.episode}
              </span>
            </div>
            <div className={styles.spanContainer}>
              <span className={styles.spanHead}>Date</span>
              <span className={styles.spanContent}>
                {episodeDetails.air_date}
              </span>
            </div>
          </div>
        </div>
      </header>
      <div className={styles.wrapEpisodesCardsContainer}>
        <span className={styles.spanCast}>Cast</span>
        <div className={styles.cardsSection}>{renderCharactersEpisode()}</div>
      </div>
    </div>
  );
};
