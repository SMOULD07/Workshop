import { Form, Link } from "react-router-dom";
import { useState } from "react";
import styles from "./ConnectionPage.module.css";

export default function ConnectionPage() {
  const ApiUrl = import.meta.env.VITE_API_URL;
  const [connectionForm, setConnectionForm] = useState({
    username: "",
    password: "",
  });

  // State pour obtenir less erreurs du formulaire
  const [formErrors, setFormErrors] = useState({
    username: "",
    password: "",
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
  const validPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(String(password));
  };

  // Valider tous les vérificateurs après 
  const validInputs = () => {
    const { username, password } = connectionForm;

    const fields = [
      {
        name: "username",
        value: username,
        message: "Un pseudo doit être requis",
        minLength: 2,
        errorMessage: "Ce pseudo correspond à aucun compte",
      },

      {
        name: "password",
        value: password,
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
        } else if (name === "password" && !validPassword(value)) {
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
  const handleLogin = async (dataForm) => {
    try {
      const response = await fetch(`${ApiUrl}/api/user/login`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataForm),
        credentials: "include",
      });

      if (response.status === 200) {
        const user = await response.json();
        handleLogin(user.user);
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
      username: connectionForm.username,
      password: connectionForm.password,
    };

    if (validInputs() === true) {
      const result = await handleLogin({ formData });
      if (result === true) {
        window.location.href = "/";
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
            id= "username"
            name= "username"
            aria-label= "Entrer un pseudonyme"
            value={connectionForm.username}
            onChange={handleChange}
            required
          />
          {formErrors.username !== "" && (
            <div className={styles.error}>{formErrors.username}</div>
          )}
           <label htmlFor=" password" > Mot de passe</label>
          <input
            type= "password"
            id= "password"
            name= "password"
            aria-label= "Entrer le mot de passe de votre compte"
            value={connectionForm.password}
            onChange={handleChange}
            required
          />
<Link to = "/choice">
          <button
            type= "submit"
            aria-label= "C'est ici pour vous connecter à votre compte"
            onClick={handleSubmit}
            > Connexion
          </button>
</Link>
        </Form>
      </div>
      </>
  );
}