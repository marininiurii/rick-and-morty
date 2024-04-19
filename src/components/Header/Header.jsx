import styles from "./Header.module.css";
import logo from "../../assets/svg/logo-black 1.svg";
import { MenuNavigation } from "../primitivs/MenuNavigation/MenuNavigation";
import { NavigateTabButton } from "../primitivs/NavigateTabButton/NavigateTabButton";

export const Header = () => {
  const pathForLinks = ["characters", "locations", "episodes"];
  const renderLinks = pathForLinks.map((path) => (
    <NavigateTabButton path={path} key={path} />
  ));
  return (
    <header className={styles.main}>
      <div className={styles.image}>
        <img src={logo} alt="Логотип" />
      </div>
      <div className={styles.links}>{renderLinks}</div>
      <MenuNavigation className={styles.menuNavigation} />
    </header>
  );
};
