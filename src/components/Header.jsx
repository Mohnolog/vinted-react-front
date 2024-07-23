import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ setUser, token, setSearch }) => {
  return (
    <header>
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>

      <div className="search">
        <input
          type="text"
          className="search-input"
          placeholder="Recherche des articles"
          onChange={(event) => setSearch(event.target.value)}
        />
        <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
      </div>
      {token ? (
        <nav className="nav">
          <button
            onClick={() => {
              setUser(null);
            }}
            className="button"
          >
            Se déconnecter
          </button>
        </nav>
      ) : (
        <nav className="nav">
          <NavLink to={"/signup"} className="button">
            S'inscrire
          </NavLink>
          <NavLink to={"/login"} className="button">
            Se connecter
          </NavLink>
        </nav>
      )}
      <nav className="nav">
        <NavLink to={"/publish"} className="button">
          Vends tes articles
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
