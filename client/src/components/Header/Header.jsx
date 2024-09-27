import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.svg";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <main className={styles.container_header}>
      <Link to="/choice">
        <img
          src={Logo}
          className={styles.logo}
          alt="Logo why not qui redirige vers la page d'accueil"
        />
      </Link>
    </main>
  );
  
}
