import { Form } from "react-router-dom";
import { useState, Link } from "react";
import styles from "./RegistrationPage.module.css";

export default function RegistrationPage() {


// State pour gérer les valeurs du formulaire 
  const [registerForm, setRegisterForm] = useState ({
    username : "", 
    password : "",
    password2 : "", 
  })

// State pour gérer les erreurs du formulaire 
const [formErrors, setFormErrors] = useState({
    username : "",
    password : "",
    password2 : "", 
  })

  // Gestion des changements des erreurs (utilisation du setter)
   const handleChange = (e) => {
    setRegisterForm ({ ...registerForm,[e.target.name] :e.target.value});
   };
   // Paramétrer la gestion des erreurs
   const setError = (name, message) => {
    setFormErrors((previousErrors) => ({
      ...previousErrors,
      [name] : message,
    }));
  };  

   // Paramétrer les réussites (en effaçantles erreurs)
  const setSuccess = (name) => {
    setFormErrors((previousErrors) => ({
      ...previousErrors,
      [name] : "",
    }));
  };

  // -----------------------------------------------DEBUT DES VERIFICATEURS FRONT------------------------------------------------//

  // expression regluière pour exiger des types de caractères pour le password 
  const validPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(String(password));
  };

  const validUsername = (username) => username.length >= 2;

// Attester de la validité des "inputs" (champs)
const validInputs = () => {
  const { username, password, password2 } = registerForm;
  const fields = [
    {
      name: "username", 
      value : username,
      message : "Un pseudo doit être requis",
      minLenght : 2,
      errorMessage:" Pseudo doit contenir au moins 2 caractères"
    },

    {
      name: "password", 
      value : password,
      message : "Un mot de passe doit être requis",
      minLenght : 8,
      errorMessage: "Mot de passe doit contenir au minimum 8 caractères dont au moins une majuscule , un nombre et un caractère spécial",
    },

    {
      name: "password2",
      value: password2,
      message: "Veuillez confirmer votre mot de passe",
      match: password,
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
        } else if (name === "username" && !validUsername(value)) {
          setError(name, errorMessage);
          allValid = false;
        } else if (name === "password" && !validPassword(value)) {
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
    username: registerForm.username,
    lastname: registerForm.lastname,
    firstname: registerForm.firstname,
    mail: registerForm.mail,
    password: registerForm.password,
  };

  if (validInputs() === true) {
    const result = ({ formData });

    if (result.success) {
      window.location.href = "/connection";
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
           
            <label htmlFor="username">Pseudonyme</label>
            <input
              placeholder="Zelda55"
              type="text"
              id="username"
              name="username"
              aria-label="Entrer un pseudonyme de votre choix qui contient un minimum de 2 caractères"
              value={registerForm.username}
              onChange={handleChange}
              required
            />
             {formErrors.username !== "" && (
            <div className="error">{formErrors.username}</div>
          )}
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            value={registerForm.password}
            onChange={handleChange}
            aria-label=" Entrer un mot de passe avec un minimum de 8 caractères dont au moins une lettre majuscules et un des caractères spéciaux"
          />
          {formErrors.password !== "" && (
            <div className="error">{formErrors.password}</div>
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
          <Link to = "/choice">
            <button
              type="submit"
              aria-label=" Cliquez sur le bouton pour valider les informations saisies pour procédeder à la création du profil de Why not ? "
              onSubmit={handleSubmit}> Valider
              </button>
          </Link>
        </Form>
      </div>
      </>
  );
}