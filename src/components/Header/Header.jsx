import styles from "./Header.module.css";
import logo from "../../assets/svg/logo-black 1.svg";
import { MenuNavigation } from "../ui/MenuNavigation/MenuNavigation";
import { NavigateTabButton } from "../ui/NavigateTabButton/NavigateTabButton";
import { useNavigate } from "react-router-dom";
import { PATH_FOR_LINKS } from "./constants";

export const Header = () => {
  const navigate = useNavigate();
  const renderLinks = PATH_FOR_LINKS.map(([name, path]) => (
    <NavigateTabButton path={path} key={name}>
      {name}
    </NavigateTabButton>
  ));
  return (
    <header className={styles.main}>
      <div className={styles.image}>
        <img onClick={() => navigate("/")} src={logo} alt="Логотип" />
      </div>
      <div className={styles.links}>{renderLinks}</div>
      <MenuNavigation className={styles.menuNavigation} />
    </header>
  );
};
