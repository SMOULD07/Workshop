import { Link } from "react-router-dom";

import BoxVisual from "../../components/BoxVisual/BoxVisual";
import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <main className={styles.container_homepage}>
      <h1>Des idées ?</h1>
      <BoxVisual />

      <div className={styles.button_container}>
        <Link to="/registration">
          <button type="button" className={styles.button_registration}>
            S'inscrire
          </button>
        </Link>

        <Link to="/connection">
          <button type="button" className={styles.button_connection}>
            Se connecter
          </button>
        </Link>
      </div>
    </main>
  );
}
