import styles from "./Header.module.css";
import Link from "@mui/material/Link";
import logo from "../../assets/svg/logo-black 1.svg";

export const Header = () => {
  return (
    <header className={styles.main}>
      <div className={styles.image}>
        <img src={logo} alt="Логотип" />
      </div>
      <div className={styles.links}>
        <Link href="/characters" color="#000000" underline="none">
          Characters
        </Link>
        <Link href="/locations" color="#000000" underline="none">
          Locations
        </Link>
        <Link href="/episodes" color="#000000" underline="none">
          Episodes
        </Link>
      </div>
    </header>
  );
};
