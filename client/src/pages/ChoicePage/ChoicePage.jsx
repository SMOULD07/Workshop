import { Link } from "react-router-dom";
import BoxVisual from "../../components/BoxVisual/BoxVisual";
import styles from "./ChoicePage.module.css";
import Header from "../../components/Header/Header";

export default function ChoicePage() {
  return (
    <main>
      <Header />

<div className={styles.title_choice_container}>
      <h1>Bienvenue  👋 dans notre BOX à idées digitale</h1>  
      <BoxVisual />

      <h2>Ici, proposes toutes les idées pour améliorer la vie sur le campus. Ta seule limite ton imagination 💭
      Tu peux aussi <strong>voter 🗳️ </strong> pour les idées qui sont dans la boîte </h2>
    </div>

    



      <div className={styles.button_container}>
        <Link to="/idea">
          <button
            type="button"
            className={styles.button_idea}
            aria-label="Déposes tes idées"
          >
            Déposes ton idée
          </button>
        </Link>

        <Link to="/vote">
          <button
            type="button"
            className={styles.button_vote}
            aria-label="Votes pour tes idées"
          >
            Votez pour les idées déposées
          </button>
        </Link>
      </div>
    </main>
  );
}
