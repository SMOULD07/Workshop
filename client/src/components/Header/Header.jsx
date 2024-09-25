import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.svg";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <main>
      <Link to="/">
        <img
          src={Logo}
          className={styles.header_container}
          alt="Logo why not qui redirige vers la page d'accueil"
        />
      </Link>
      <img
        src={Logo}
        className={styles.header_container}
        alt="Logo why not qui redirige vers la page d'accueil"
      />
      <Link to="/">
        <img
          src={Logo}
          className={styles.header_container}
          alt="Logo why not qui redirige vers la page d'accueil"
        />
      </Link>
    </main>
  );
}
