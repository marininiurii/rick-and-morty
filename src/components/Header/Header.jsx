import styles from "./Header.module.css";
import logo from "../../assets/svg/logo-black 1.svg";
import { MenuNavigation } from "../UI/MenuNavigation/MenuNavigation";
import { NavigateTabButton } from "../UI/NavigateTabButton/NavigateTabButton";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const pathForLinks = ["characters", "locations", "episodes"];
  const navigate = useNavigate();
  const renderLinks = pathForLinks.map((path) => (
    <NavigateTabButton path={path} key={path} />
  ));
  return (
    <header className={styles.main}>
      <div className={styles.image}>
        <img onClick={() => navigate("/characters")} src={logo} alt="Логотип" />
      </div>
      <div className={styles.links}>{renderLinks}</div>
      <MenuNavigation className={styles.menuNavigation} />
    </header>
  );
};
