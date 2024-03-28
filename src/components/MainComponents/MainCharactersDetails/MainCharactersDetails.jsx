import styles from "./MainCharactersDetails.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { responseCharacterDetails } from "../../../api/ResponseCharacterDetails";
import arrowLogo from "../../../assets/svg/arrow_back.svg";
import { LoadingComponent } from "../../primitivs/LoadingComponent/LoadingComponent";
import { responseEpisodePage } from "../../../api/ResponseEpisodesPage";

export const MainCharactersDetails = () => {
  const { id } = useParams();
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(true);
  const [pageState, setPageState] = useState({});

  const getCharacterDetails = async () => {
    try {
      const response = await responseCharacterDetails(id);
      setState(response);
      console.log("response :>> ", response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCharacterDetails();
  }, []);

  return !loading ? (
    <div className={styles.main}>
      <div className={styles.headSection}>
        <div className={styles.goBackSection}>
          <a href="#">
            <img src={arrowLogo} alt="back" />
            <span className={styles.span}>GO BACK</span>
          </a>
        </div>
        <div className={styles.logoSection}>
          <img className={styles.image} src={state.image} alt="Логотип" />
          <h1>{state?.name}</h1>
        </div>
      </div>
      <div className={styles.infoSection}>
        <div className={styles.informations}>
          <h3>Informations</h3>
          <dl>
            <dt>Gender</dt>
            <dd>{state.gender}</dd>
            <dt>Status</dt>
            <dd>{state.status}</dd>
            <dt>Specie</dt>
            <dd>{state.species}</dd>
            <dt>Origin</dt>
            <dd>{state.origin.name}</dd>
            <dt>Type</dt>
            <dd>{state.type}</dd>
            <dt>Location</dt>
            <dd>{state.location.name}</dd>
          </dl>
        </div>
        <div className={styles.episodes}>
          <h3>Episodes</h3>
          <dl>
            <dt>Gender</dt>
            <dd>{state.gender}</dd>
            <dt>Status</dt>
            <dd>{state.status}</dd>
            <dt>Specie</dt>
            <dd>{state.species}</dd>
            <dt>Origin</dt>
            <dd>{state.origin.name}</dd>
          </dl>
        </div>
      </div>
    </div>
  ) : (
    <LoadingComponent />
  );
};
