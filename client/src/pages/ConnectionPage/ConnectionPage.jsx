import { Form} from "react-router-dom";
import { useState } from "react";
import styles from "./ConnectionPage.module.css";

export default function ConnectionPage() {
  const [connectionForm, setConnectionForm] = useState({
    nom: "",
    mdp: "",
  });

  // State pour obtenir less erreurs du formulaire
  const [formErrors, setFormErrors] = useState({
    nom: "",
    mdp: "",
  });

  // Fonction pour sauvegarder la données 
  const handleChange = (e) => {
    setConnectionForm({ ...connectionForm, [e.target.name]: e.target.value });
  };

  // Gérer les 
  const setError = (name, message) => {
    setFormErrors((previousErrors) => ({
      ...previousErrors,
      [name]: message,
    }));
  };

  // function for success
  const setSucess = (name) => {
    setFormErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
    }));
  };

  // expression régulières pour imposer des types de mot de passe 
  const validPassword = (mdp) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(String(mdp));
  };

  // Valider tous les vérificateurs après 
  const validInputs = () => {
    const { nom, mdp } = connectionForm;

    const fields = [
      {
        name: "nom",
        value: nom,
        message: "Un pseudo doit être requis",
        minLength: 2,
        errorMessage: "Ce pseudo correspond à aucun compte",
      },

      {
        name: "mdp",
        value: mdp,
        message: "Un mot de passe doit être requis ",
        minLength: 8,
        errorMessage: "Le mot de passe est incorrect",
      },
    ];

    let allValid = true;

    fields.forEach(
      ({ name, value, message, minLength, errorMessage, match }) => {
        if (value.trim() === "") {
          setError(name, message);
          allValid = false;
        } else if (minLength && value.length < minLength) {
          setError(name, errorMessage);
          allValid = false;
        } else if (name === "mdp" && !validPassword(value)) {
          setError(name, message);
          allValid = false;
        } else if (match !== undefined && value !== match) {
          setError(name, message);
          allValid = false;
        } else {
          setSucess(name);
        }
      }
    );
    return allValid;
  };

  // Permet utilisateur de se connecter en récupérant les données dans la BD 
  const handleLogin = async (FormData) => {
    try {
      const ApiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${ApiUrl}/api/user/login`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(FormData),
        credentials: "include",
      });

      if (response.status === 200) {
        const user = await response.json();
        handleLogin(user.utilisateur);
        return true;
      }
    } catch (error) {
      console.error("Error during login:", error);
    }

    return false;
  };
  /* Function to be able to send the data */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      Nom: connectionForm.nom,
      Mdp: connectionForm.mdp,
    };

    if (validInputs() === true) {
      const result = await handleLogin({ formData });
      if (result === true) {
        window.location.href = "/choice";
      } else {
        setError("form", result.error);
      }
    }
  };

  return (
    <>
    <h1>Créer votre profil</h1>
      <div className={styles.cardRegistration}>
      <Form method="post" className={styles.formConnection}>
           
          <label htmlFor= "pseudonyme" > Pseudonyme</label>
          <input
            placeholder= "votre pseudo"
            type= "text"
            id= "nom"
            name= "nom"
            aria-label= "Entrer un pseudonyme"
            value={connectionForm.nom}
            onChange={handleChange}
            required
          />
          {formErrors.nom !== "" && (
            <div className={styles.error}>{formErrors.nom}</div>
          )}
           <label htmlFor=" mdp" > Mot de passe</label>
          <input
            type= "password"
            id= "mdp"
            name= "mdp"
            aria-label= "Entrer le mot de passe de votre compte"
            value={connectionForm.mdp}
            onChange={handleChange}
            required
          />
          <button
            type= "submit"
            aria-label= "C'est ici pour vous connecter à votre compte"
            onClick={handleSubmit}
            > Connexion
          </button>
        </Form>
      </div>
      </>
  );
}