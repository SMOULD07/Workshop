import { Form } from "react-router-dom";
import { useState } from "react";
import styles from "./RegistrationPage.module.css";

export default function RegistrationPage() {
  // State pour gérer les valeurs du formulaire
  const [registerForm, setRegisterForm] = useState({
    nom: "",
    mdp: "",
    password2: "",
  });

  // State pour gérer les erreurs du formulaire
  const [formErrors, setFormErrors] = useState({
    nom: "",
    mdp: "",
    password2: "",
  });

  // Gestion des changements des erreurs (utilisation du setter)
  const handleChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };
  // Paramétrer la gestion des erreurs
  const setError = (name, message) => {
    setFormErrors((previousErrors) => ({
      ...previousErrors,
      [name]: message,
    }));
  };

  // Paramétrer les réussites 
  const setSuccess = (name) => {
    setFormErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
    }));
  };

  // -----------------------------------------------DEBUT DES VERIFICATEURS FRONT------------------------------------------------//

  // expression regluière pour exiger des types de caractères pour le mot de passe
  const validPassword = (mdp) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(String(mdp));
  };

  const validUsername = (nom) => nom.length >= 2;

  // Attester de la validité des "inputs" (champs)
  const validInputs = () => {
    const { nom, mdp, password2 } = registerForm;
    const fields = [
      {
        name: "nom",
        value: nom,
        message: "Un pseudo doit être requis",
        minLenght: 2,
        errorMessage: " Pseudo doit contenir au moins 2 caractères",
      },

      {
        name: "mdp",
        value: mdp,
        message: "Un mot de passe doit être requis",
        minLenght: 8,
        errorMessage:
          "Mot de passe doit contenir au minimum 8 caractères dont au moins une majuscule , un nombre et un caractère spécial",
      },

      {
        name: "password2",
        value: password2,
        message: "Veuillez confirmer votre mot de passe",
        match: mdp,
        errorMessage: "Le mot de passe doit être identique avec celui du haut",
      },
    ];

    let allValid = true;

    fields.forEach(
      ({ name, value, message, errorMessage, minLength, match }) => {
        if (value.trim() === "") {
          setError(name, message);
          allValid = false;
        } else if (minLength && value.length < minLength) {
          setError(name, errorMessage);
          allValid = false;
        } else if (name === "nom" && !validUsername(value)) {
          setError(name, errorMessage);
          allValid = false;
        } else if (name === "mdp" && !validPassword(value)) {
          setError(name, errorMessage);
          allValid = false;
        } else if (match !== undefined && value !== match) {
          setError(name, errorMessage);
          allValid = false;
        } else {
          setSuccess(name);
        }
      }
    );

    return allValid;
  };

  // -----------------------------------------------FIN DES VERIFICATEURS FRONT------------------------------------------------//

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      Nom: registerForm.nom,
      Mdp: registerForm.mdp,
    };
    // Gérer l'inscription
    const ApiUrl = import.meta.env.VITE_API_URL;
    const handleSignUp = async () => {
      try {
        const response = await fetch(`${ApiUrl}/api/user/registration`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.status !== 201) {
          const errorData = await response.json();
          return { error: errorData.message };
        }

        return { success: true };
      } catch (error) {
        return { error: error.message };
      }
    };

    if (validInputs() === true) {
      const result = await handleSignUp({ formData });

      if (result.success) {
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
        <Form method="post" className={styles.formRegistration}>
          <label htmlFor="nom">Pseudonyme</label>
          <input
            placeholder="Zelda55"
            type="text"
            id="nom"
            name="nom"
            aria-label="Entrer un pseudonyme de votre choix qui contient un minimum de 2 caractères"
            value={registerForm.nom}
            onChange={handleChange}
            required
          />
          {formErrors.username !== "" && (
            <div className="error">{formErrors.nom}</div>
          )}
          <label htmlFor="mdp">Mot de passe</label>
          <input
            type="password"
            id="mdp"
            name="mdp"
            value={registerForm.mdp}
            onChange={handleChange}
            aria-label=" Entrer un mot de passe avec un minimum de 8 caractères dont au moins une lettre majuscules et un des caractères spéciaux"
          />
          {formErrors.password !== "" && (
            <div className="error">{formErrors.mdp}</div>
          )}
          <label htmlFor="password2">Confirmer votre mot de passe</label>
          <input
            type="password"
            id="password2"
            name="password2"
            value={registerForm.password2}
            onChange={handleChange}
            aria-label="Entrer un mot de passe identique à celui saisi au-dessus"
          />
          {formErrors.password2 !== "" && (
            <div className="error">{formErrors.password2}</div>
          )}

          <button
            type="submit"
            aria-label=" Cliquez sur le bouton pour valider les informations saisies pour procédeder à la création du profil de Why not ? "
            onClick={handleSubmit}
          >
            Valider
          </button>
        </Form>
      </div>
    </>
  );
}
