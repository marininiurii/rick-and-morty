import styles from "./MainEpisodesDetails.module.css";
import { ArrowGoBack } from "../../ui/ArrowGoBack/ArrowGoBack";
import { useNavigate, useParams } from "react-router-dom";
import { CardCharacters } from "../../ui/CardCharacters/CardCharacters";
import { useDispatch, useSelector } from "react-redux";
import { LoadingComponent } from "../../ui/LoadingComponent/LoadingComponent";
import { useEffect } from "react";
import {
  useGetCharactersCollectionQuery,
  useGetEpisodesQuery,
} from "../../../store/services/rickAndMortyApi";
import { StateSlice } from "../../../store/reducers/charactersPageReducer";

export const MainEpisodesDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { episodes } = useSelector((state) => state.reducer);
  const { setEpisodes } = StateSlice.actions;

  const { data: episodeDetails, isLoading } = useGetEpisodesQuery({ id });
  const charactersId = episodeDetails?.characters.map((url) => url.split("/").pop());
  const { data: episodeState } = useGetCharactersCollectionQuery(charactersId);

  useEffect(() => {
    if (episodeState) {
      dispatch(setEpisodes(episodeState));
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
