import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

const SignUp = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/user/signup`,

        {
          email: email,
          password: password,
          username: username,
        }
      );

      if (response.data.token) {
        setUser(response.data.token);
        navigate("/");
      } else {
        alert("une erreur est survenue, veuillez réessayer.");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      className="signup-container"
      onClick={() => {
        navigate("/");
      }}
    >
      <h2>S'inscrire</h2>
      <form
        onSubmit={handleSubmit}
        className="signup-form"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button className="cross" onClick={() => navigate("/")}>
          X
        </button>
        <input
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          type="text"
          placeholder="username"
        />
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrorMessage("");
          }}
          type="email"
          placeholder="Email"
        />
        <span>{errorMessage}</span>
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          placeholder="Password"
        />
        <div className="checkbox-container">
          <div>
            <input type="checkbox" />
            <span>S'inscrire à notre newsletter</span>
          </div>
          <p>
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
        </div>
        <button type="submit">S'inscrire</button>
      </form>
      <Link
        style={{ color: "inherit" }}
        to="/login"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        Tu as déjà un compte ? Connecte-toi !
      </Link>
    </div>
  );
};

export default SignUp;
