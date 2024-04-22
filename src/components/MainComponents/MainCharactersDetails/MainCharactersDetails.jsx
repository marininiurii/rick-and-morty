import styles from "./MainCharactersDetails.module.css";
import ArrowLink from "../../../assets/svg/arrow_forward.svg";
import { Link, useParams } from "react-router-dom";
import { ArrowGoBack } from "../../primitivs/ArrowGoBack/ArrowGoBack";
import {
  useGetCharactersQuery,
  useGetEpisodesPageQuery,
  useGetEpisodesQuery,
} from "../../../store/services/rickAndMortyApi";
import { useDispatch, useSelector } from "react-redux";
import { setEpisodesAction } from "../../../store/reducers/charactersPageReducer";
import { LoadingComponent } from "../../primitivs/LoadingComponent/LoadingComponent";
import { useEffect } from "react";

export const MainCharactersDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const episodes = useSelector((state) => state.charactersPage.episodes);
  const setEpisodes = (payload) => dispatch(setEpisodesAction(payload));

  const { data: characterDetails, isLoading } = useGetCharactersQuery({ id });

  let episodesPages = [];
  if (characterDetails) {
    episodesPages = characterDetails.episode.map((url) => url.split("/").slice(-1)[0]);
  }

  const { data: episodeState } = useGetEpisodesQuery({ ...episodesPages });

  useEffect(() => {
    if (episodeState) {
      setEpisodes(episodeState.results);
    }
  }, [episodeState]);
  const characterInformation = ["gender", "status", "species", "origin", "type"];

  const renderInformations = () => {
    return characterInformation.map((information) => {
      const informationToUpperCase = information.charAt(0).toUpperCase() + information.slice(1);
      let value = characterDetails[information];
      if (information === "origin") {
        value = value["name"];
      }
      return (
        <div key={information} className={styles.spanContainer}>
          <span className={styles.spanEpisode}>{informationToUpperCase}</span>
          <span className={styles.spanName}>{value}</span>
        </div>
      );
    });
  };

  const renderEpisodes = () => {
    let data = episodes;
    if (!Array.isArray(episodes)) {
      data = [episodes];
    }
    return data.map(({ episode, name, air_date, id }) => (
      <Link className={styles.link} key={id} to={`/episodes/${id}`}>
        <div className={styles.spanContainer}>
          <span className={styles.spanEpisode}>{episode}</span>
          <span className={styles.spanName}>{name}</span>
          <span className={styles.spanAirDate}>{air_date}</span>
          <img className={styles.imageArrowLink} src={ArrowLink} alt="Стрелка" />
        </div>
      </Link>
    ));
  };

  if (isLoading) {
    return <LoadingComponent />;
  }
  return (
    <div className={styles.main}>
      <div className={styles.headSection}>
        <div className={styles.goBackSection}>
          <ArrowGoBack className={styles.arrow} href={"/characters"} />
        </div>
        <div className={styles.logoSection}>
          <img className={styles.image} src={characterDetails.image} alt="Логотип" />
          <h1>{characterDetails.name}</h1>
        </div>
      </div>
      <div className={styles.infoSection}>
        <div className={styles.informations}>
          <h3>Informations</h3>
          {renderInformations()}
          <Link
            className={styles.link}
            to={`/locations/${characterDetails.location.url.split("/").slice(-1)[0]}`}
          >
            <div className={styles.spanContainer}>
              <span className={styles.spanEpisode}>Location</span>
              <span className={styles.spanName}>{characterDetails.location.name}</span>
              <img className={styles.imageArrowLink} src={ArrowLink} alt="Стрелка" />
            </div>
          </Link>
        </div>
        <div className={styles.episodes}>
          <h3>Episodes</h3>
          {renderEpisodes()}
        </div>
      </div>
    </div>
  );
};
