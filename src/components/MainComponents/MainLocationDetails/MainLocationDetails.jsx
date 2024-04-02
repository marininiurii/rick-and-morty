import { useNavigate, useParams } from "react-router-dom";
import { ArrowGoBack } from "../../primitivs/ArrowGoBack/ArrowGoBack";
import styles from "./MainLocationDetails.module.css";
import { useEffect, useState } from "react";
import { responseLocationsDetails } from "../../../api/ResponseLocationDetails";
import { CardCharacters } from "../../primitivs/CardCharacters/CardCharacters";
import { responseCharacterDetails } from "../../../api/ResponseCharacterDetails";

export const MainLocationDetails = () => {
  const { id } = useParams();
  const [locationDetails, setLocationDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [locationsState, setLocationsState] = useState([]);
  const navigate = useNavigate();

  const getLocationDetails = async () => {
    try {
      const response = await responseLocationsDetails(id);
      // locationDetails детали конкретной локации. Приходит объект локации с именем датой и тд
      await setLocationDetails(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getLocationCharacters = async () => {
    try {
      const residentsId = await locationDetails.residents.map(
        (url) => url.split("/").slice(-1)[0]
      );
      const responseCharactersDetailsCards = await responseCharacterDetails(
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
    return locationsState.map(({ image, name, species, id }) => {
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
