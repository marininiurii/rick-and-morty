import styles from "./MainEpisodesDetails.module.css";
import { ArrowGoBack } from "../../primitivs/ArrowGoBack/ArrowGoBack";
import { useNavigate, useParams } from "react-router-dom";
import { CardCharacters } from "../../primitivs/CardCharacters/CardCharacters";
import { useDispatch, useSelector } from "react-redux";
import { setEpisodesAction } from "../../../store/reducers/charactersPageReducer";
import { LoadingComponent } from "../../primitivs/LoadingComponent/LoadingComponent";
import { useEffect } from "react";
import {
  useGetCharactersQuery,
  useGetEpisodesQuery,
} from "../../../store/services/rickAndMortyApi";

export const MainEpisodesDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const episodes = useSelector((state) => state.charactersPage.episodes);
  const setEpisodes = (payload) => dispatch(setEpisodesAction(payload));

  const { data: episodeDetails, isLoading } = useGetEpisodesQuery({ id });

  let charactersId = [];
  if (episodeDetails) {
    charactersId = episodeDetails.characters.map((url) => url.split("/").slice(-1)[0]);
  }
  const { data: episodeState } = useGetCharactersQuery({ ...charactersId });
  useEffect(() => {
    if (episodeState) {
      setEpisodes(episodeState.results);
    }
  }, [episodeState]);

  const renderCharactersEpisode = () => {
    return episodes.map(({ image, name, species, id }) => {
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

  if (isLoading) {
    return <LoadingComponent />;
  }
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
              <span className={styles.spanContent}>{episodeDetails.episode}</span>
            </div>
            <div className={styles.spanContainer}>
              <span className={styles.spanHead}>Date</span>
              <span className={styles.spanContent}>{episodeDetails.air_date}</span>
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
