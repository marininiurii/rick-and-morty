import styles from "./MainCharactersDetails.module.css";
import ArrowLink from "../../../assets/svg/arrow_forward.svg";
import { Link, useParams } from "react-router-dom";
import { ArrowGoBack } from "../../ui/ArrowGoBack/ArrowGoBack";
import { useDispatch, useSelector } from "react-redux";
import { LoadingComponent } from "../../ui/LoadingComponent/LoadingComponent";
import { useEffect } from "react";
import {
  useGetCharactersQuery,
  useGetEpisodesCollectionQuery,
} from "../../../store/services/rickAndMortyApi";
import { StateSlice } from "../../../store/reducers/charactersPageReducer";

export const MainCharactersDetails = () => {
  const characterInformation = ["gender", "status", "species", "origin", "type"];
  const { id } = useParams();
  const dispatch = useDispatch();

  const { episodes } = useSelector((state) => state.reducer);
  const { setEpisodes } = StateSlice.actions;
  const { data: characterDetails, isLoading } = useGetCharactersQuery({ id });

  const episodesPages = characterDetails?.episode.map((url) => url.split("/").pop());
  const { data: episodeState } = useGetEpisodesCollectionQuery(episodesPages);

  useEffect(() => {
    if (episodeState) {
      dispatch(setEpisodes(episodeState));
    }
  }, [episodeState]);

  const renderInformations = () => {
    return characterInformation.map((information) => {
      const informationToUpperCase =
        information.charAt(0).toUpperCase() + information.slice(1);
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
          <ArrowGoBack className={styles.arrow} href={"/"} />
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
