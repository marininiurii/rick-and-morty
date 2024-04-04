import { useNavigate, useParams } from "react-router-dom";
import { ArrowGoBack } from "../../primitivs/ArrowGoBack/ArrowGoBack";
import styles from "./MainLocationDetails.module.css";
import { useEffect, useState } from "react";
import { CardCharacters } from "../../primitivs/CardCharacters/CardCharacters";
import { responseDetails } from "../../../api/ResponseDetails";

export const MainLocationDetails = () => {
  const { id } = useParams();
  const [locationDetails, setLocationDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [locationsState, setLocationsState] = useState([]);
  const navigate = useNavigate();

  const getLocationDetails = async () => {
    const path = "location";
    try {
      const response = await responseDetails(path, id);
      // locationDetails детали конкретной локации. Приходит объект локации с именем датой и тд
      await setLocationDetails(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getLocationCharacters = async () => {
    const path = "character";
    try {
      if (locationDetails.residents.length === 0) return;
      // if (!Array.isArray(locationDetails.residents)) return

      const residentsId = await locationDetails.residents.map(
        (url) => url.split("/").slice(-1)[0]
      );
      const responseCharactersDetailsCards = await responseDetails(
        path,
        residentsId
      );
      // locationsState содержит коллекцию объектов с информацией о персонажах
      await setLocationsState(responseCharactersDetailsCards);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLocationDetails();
    if (!loading) {
      getLocationCharacters();
    }
  }, [loading]);

  const renderCharactersLocation = () => {
    if (locationsState.length === 0) {
      return <div className={styles.noResidentsContainer}>No Residents</div>;
    }
    let data = locationsState;
    if (!Array.isArray(locationsState)) {
      data = [locationsState];
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
