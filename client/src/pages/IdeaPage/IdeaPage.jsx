import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./IdeaPage.module.css";
import Header from "../../components/Header/Header";

export default function ChoicePage() {
  const navigate = useNavigate();

  // State pour gérer les valeurs du formulaire
  const [dropIdea, setDropIdea] = useState({
    titre: "",
    description: "",
  });

  // State pour gérer les messages d'erreur
  const [errorMessage, setErrorMessage] = useState("");

  // Fonction pour gérer les changements dans le formulaire
  const handleChange = (e) => {
    setDropIdea({ ...dropIdea, [e.target.name]: e.target.value });
  };

  // Fonction pour gérer la validation et l'envoi du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      Titre: dropIdea.titre,
      Description: dropIdea.description,
    };

    const ApiUrl = import.meta.env.VITE_API_URL;

    try {
      const response = await fetch(`${ApiUrl}/api/suggestion/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status !== 201) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Erreur lors de la soumission.");
        return;
      }

      navigate("/choice");

    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <main>
      <Header />
      <h1 className={styles.title_idea}>La boite à idée du campus René Cassin</h1>
      <h2 className={styles.subtitle_idea}>Des idées ? pour <strong> améliorer le quotien </strong> des étudiants. Déposer la par <strong> ici</strong> </h2>
      <h2  className={styles.icone_idea}>👇 </h2>
   

      {errorMessage && <p className={styles.error}>{errorMessage}</p>} {/* Affichage des messages d'erreur */}

      <form onSubmit={handleSubmit} className={styles.formConnection}>
        <label htmlFor="title">Titre</label>
        <input
          placeholder="Votre titre"
          type="text"
          id="title"
          name="titre"
          aria-label="Entrer un titre"
          value={dropIdea.titre}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
          placeholder="Écris ton idée"
          rows="5"
          cols="30"
          id="description"
          name="description"
          aria-label="Entrer la description"
          value={dropIdea.description}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          aria-label="Cliquez pour déposer votre idée dans la boîte à idées digitale"
        >
          Déposer
        </button>
      </form>
    </main>
  );
}
