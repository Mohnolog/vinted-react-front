import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setIsLoading(true);
      const response = await axios.post(
        "https://site--backend-vinted--ktq7rdyfd79c.code.run/user/login",
        {
          email: email,
          password: password,
        }
      );
      if (response.data.token) {
        setUser(response.data.token);
        setIsLoading(false);
        navigate("/");
      } else {
        alert("Une erreur est survenue, veuillez réssayer.");
      }
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 400) {
        setErrorMessage("Mauvais email et/ou mot de passe");
        setIsLoading(false);
      }
      console.log(error.message);
    }
    return (
      <div className="signup-container">
        <h2>Se connecter</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
              setErrorMessage("");
            }}
            placeholder="Email"
          />
          <input
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            placeholder="Password"
            type="password"
          />
          <span>{errorMessage}</span>
          isLoading ? (
          <main>
            <p>Loading...</p>
          </main>
          ) : (
          <button disabled={isLoading ? true : false} type="submit">
            Se connecter
          </button>
          )
        </form>
        <Link to="/signup">Pas encore de compte ? Inscris-toi !</Link>
      </div>
    );
  };
};
export default Login;
