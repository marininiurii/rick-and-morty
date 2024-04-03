import styles from "./MainCharactersDetails.module.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { responseCharacterDetails } from "../../../api/ResponseCharacterDetails";
import { LoadingComponent } from "../../primitivs/LoadingComponent/LoadingComponent";
import { responseEpisodePage } from "../../../api/ResponseEpisodesPage";
import { ArrowGoBack } from "../../primitivs/ArrowGoBack/ArrowGoBack";
import ArrowLink from "../../../assets/svg/arrow_forward.svg";

export const MainCharactersDetails = () => {
  const { id } = useParams();
  const [characterDetails, setCharacterDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [episodeState, setEpisodeState] = useState([]);

  const getCharacterDetails = async () => {
    try {
      const response = await responseCharacterDetails(id);
      setCharacterDetails(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getEpisodePage = async () => {
    try {
      const episodesId = await characterDetails.episode.map(
        (url) => url.split("/").slice(-1)[0]
      );
      const respPage = await responseEpisodePage(episodesId);
      setEpisodeState(respPage.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCharacterDetails();
    if (!loading) {
      getEpisodePage();
    }
  }, [loading]);

  const renderEpisodes = episodeState.map(({ episode, name, air_date, id }) => (
    <Link className={styles.link} key={id} to={`/episodes/${id}`}>
      <div className={styles.spanContainer}>
        <span className={styles.spanEpisode}>{episode}</span>
        <span className={styles.spanName}>{name}</span>
        <span className={styles.spanAirDate}>{air_date}</span>
        <img className={styles.imageArrowLink} src={ArrowLink} alt="Стрелка" />
      </div>
    </Link>
  ));

  return !loading ? (
    <div className={styles.main}>
      <div className={styles.headSection}>
        <div className={styles.goBackSection}>
          <ArrowGoBack className={styles.arrow} href={"/characters"} />
        </div>
        <div className={styles.logoSection}>
          <img
            className={styles.image}
            src={characterDetails.image}
            alt="Логотип"
          />
          <h1>{characterDetails.name}</h1>
        </div>
      </div>
      <div className={styles.infoSection}>
        <div className={styles.informations}>
          <h3>Informations</h3>
          <div className={styles.spanContainer}>
            <span className={styles.spanEpisode}>Gender</span>
            <span className={styles.spanName}>{characterDetails.gender}</span>
          </div>
          <div className={styles.spanContainer}>
            <span className={styles.spanEpisode}>Status</span>
            <span className={styles.spanName}>{characterDetails.status}</span>
          </div>
          <div className={styles.spanContainer}>
            <span className={styles.spanEpisode}>Specie</span>
            <span className={styles.spanName}>{characterDetails.species}</span>
          </div>
          <div className={styles.spanContainer}>
            <span className={styles.spanEpisode}>Origin</span>
            <span className={styles.spanName}>
              {characterDetails.origin.name}
            </span>
          </div>
          <div className={styles.spanContainer}>
            <span className={styles.spanEpisode}>Type</span>
            <span className={styles.spanName}>{characterDetails.type}</span>
          </div>
          <Link
            className={styles.link}
            to={`/locations/${
              characterDetails.location.url.split("/").slice(-1)[0]
            }`}
          >
            <div className={styles.spanContainer}>
              <span className={styles.spanEpisode}>Location</span>
              <span className={styles.spanName}>
                {characterDetails.location.name}
              </span>
              <img
                className={styles.imageArrowLink}
                src={ArrowLink}
                alt="Стрелка"
              />
            </div>
          </Link>
        </div>
        <div className={styles.episodes}>
          <h3>Episodes</h3>
          {renderEpisodes}
        </div>
      </div>
    </div>
  ) : (
    <LoadingComponent />
  );
};
