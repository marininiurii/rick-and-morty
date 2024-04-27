import styles from "./MainLocationDetails.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowGoBack } from "../../primitivs/ArrowGoBack/ArrowGoBack";
import { CardCharacters } from "../../primitivs/CardCharacters/CardCharacters";
import { useDispatch, useSelector } from "react-redux";
import {
  Slice,
  setLocationsAction,
} from "../../../store/reducers/charactersPageReducer";
import { LoadingComponent } from "../../primitivs/LoadingComponent/LoadingComponent";
import { useEffect } from "react";
import {
  useGetCharactersQuery,
  useGetLocationsQuery,
} from "../../../store/services/rickAndMortyApi";

export const MainLocationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { locations } = useSelector((state) => state.charactersPage);
  const { setLocations } = Slice.actions;

  const { data: locationDetails, isLoading } = useGetLocationsQuery({ id });

  let residentsId = [];
  if (locationDetails) {
    residentsId = locationDetails.residents.map(
      (url) => url.split("/").slice(-1)[0]
    );
  }

  const { data: characterDetails } = useGetCharactersQuery({ ...residentsId });

  useEffect(() => {
    if (characterDetails) {
      dispatch(setLocations(characterDetails.results));
    }
  }, [characterDetails]);

  const renderCharactersLocation = () => {
    if (locations.length === 0) {
      return <div className={styles.noResidentsContainer}>No Residents</div>;
    }
    let data = locations;
    if (!Array.isArray(locations)) {
      data = [locations];
    }
    return data.map(({ image, name, species, id }) => {
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
          <ArrowGoBack className={styles.arrow} href={"/locations"} />
        </div>
        <div className={styles.headerSection}>
          <h1>{locationDetails.name}</h1>
          <div className={styles.infoSection}>
            <div className={styles.spanContainer}>
              <span className={styles.spanHead}>Type</span>
              <span className={styles.spanContent}>{locationDetails.type}</span>
            </div>
            <div className={styles.spanContainer}>
              <span className={styles.spanHead}>Dimension</span>
              <span className={styles.spanContent}>
                {locationDetails.dimension}
              </span>
            </div>
          </div>
        </div>
      </header>
      <div className={styles.wrapResidentsCardsContainer}>
        <span className={styles.spanResidents}>Residents</span>
        <div className={styles.cardsSection}>{renderCharactersLocation()}</div>
      </div>
    </div>
  );
};
