import { Link } from "react-router-dom";
import BoxVisual from "../../components/BoxVisual/BoxVisual"
import styles from "./VotePage.module.css"

export default function VotePage () {

    return (
    <main>
        <BoxVisual/>

        <div className={styles.button_container_button}>

            <Link to="/idea">          
            <button type="button" className={styles.button_idea} aria-label="Déposes tes idées">
                Déposes ton idée
            </button>
            
            </Link>

            <Link to="/vote">
            <button type="button" className={styles.button_vote} aria-label="Votes pour tes idées">
                Votez pour les idées déposées
            </button>
            </Link> 
        </div>
    </main>
    );
  }