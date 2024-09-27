import { useState, useEffect } from "react";
import styles from "./VotePage.module.css";
import Header from "../../components/Header/Header";

export default function SwipePage() {
  const [suggestions, setSuggestions] = useState([]); 
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [swipeDirection, setSwipeDirection] = useState(""); // Pour gérer la direction du swipe

  const fetchSuggestions = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL; 
      const response = await fetch(`${apiUrl}/api/suggestion`);
      const suggestionData = await response.json();
      setSuggestions(suggestionData); 
    } catch (error) {
      console.error("Erreur à la récupération des suggestions :", error);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  // Fonction pour passer à la suggestion suivante
  const handleVote = (voteType) => {
    setSwipeDirection(voteType); // Définit la direction du swipe

    // Attendre que l'animation soit terminée avant de passer à la suggestion suivante
    setTimeout(() => {
      if (currentIndex < suggestions.length - 1) {
        setCurrentIndex((prevIndex) => prevIndex + 1); // Passe à la suggestion suivante
      }
      setSwipeDirection(""); // Réinitialise la direction du swipe
    }, 300); // Correspond à la durée de la transition CSS
  };

  return (
    <main>
      <Header />
      <h1 className={styles.vote_title} > Tu es dans la boîte à idées</h1>
      <h3 className={styles.vote_subtitle}>Votes, ton avis compte !</h3>

      {suggestions.length > 0 && currentIndex < suggestions.length ? (
        <div className={`${styles.card} ${swipeDirection ? styles[swipeDirection] : ""}`}>
          <h3 className={styles.sugesstion_title}>{suggestions[currentIndex]?.Titre || "Pas de titre"}</h3>
          <p>{suggestions[currentIndex]?.Description || "Pas de description disponible"}</p>
          <div className={styles.buttons}>
            <button className={styles.vote_items}
              type="button"
              aria-label="J'aime cette idée"
              onClick={() => handleVote("right")} // Swipe à droite pour "like"
            >
              👍
            </button>
            <button className={styles.vote_items}
              type="button"
              aria-label="Je n'aime pas cette idée"
              onClick={() => handleVote("left")} // Swipe à gauche pour "dislike"
            > 
              👎
            </button>
          </div>
        </div>
      ) : (
        <p>Aucune suggestion à afficher ou toutes les idées ont été votées.</p>
      )}
    </main>
  );
}
