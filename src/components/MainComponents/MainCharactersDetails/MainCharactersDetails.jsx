import styles from "./MainCharactersDetails.module.css";
import ArrowLink from "../../../assets/svg/arrow_forward.svg";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { LoadingComponent } from "../../primitivs/LoadingComponent/LoadingComponent";
import { ArrowGoBack } from "../../primitivs/ArrowGoBack/ArrowGoBack";
import { responseDetails } from "../../../api/ResponseDetails";

export const MainCharactersDetails = () => {
  const { id } = useParams();
  const [characterDetails, setCharacterDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [episodeState, setEpisodeState] = useState([]);

  const getCharacterDetails = async () => {
    const path = "character";
    try {
      const response = await responseDetails(path, id);
      setCharacterDetails(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getEpisodePage = async () => {
    const path = "episode";
    try {
      const episodesId = await characterDetails.episode.map(
        (url) => url.split("/").slice(-1)[0]
      );
      const respPage = await responseDetails(path, episodesId);
      setEpisodeState(respPage);
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

  const characterInformation = [
    "gender",
    "status",
    "species",
    "origin",
    "type",
  ];

  const renderInformations = () => {
    return characterInformation.map((information) => {
      const informationToupperCase =
        information.charAt(0).toUpperCase() + information.slice(1);
      let value = characterDetails[information];
      if (information === "origin") {
        value = value["name"];
      }
      return (
        <div key={information} className={styles.spanContainer}>
          <span className={styles.spanEpisode}>{informationToupperCase}</span>
          <span className={styles.spanName}>{value}</span>
        </div>
      );
    });
  };

  const renderEpisodes = () => {
    let data = episodeState;
    if (!Array.isArray(episodeState)) {
      data = [episodeState];
    }
    return data.map(({ episode, name, air_date, id }) => (
      <Link className={styles.link} key={id} to={`/episodes/${id}`}>
        <div className={styles.spanContainer}>
          <span className={styles.spanEpisode}>{episode}</span>
          <span className={styles.spanName}>{name}</span>
          <span className={styles.spanAirDate}>{air_date}</span>
          <img
            className={styles.imageArrowLink}
            src={ArrowLink}
            alt="Стрелка"
          />
        </div>
      </Link>
    ));
  };

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
          {renderInformations()}
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
          {renderEpisodes()}
        </div>
      </div>
    </div>
  ) : (
    <LoadingComponent />
  );
};
