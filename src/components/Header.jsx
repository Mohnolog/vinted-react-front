import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = ({ setUser, token }) => {
  return (
    <header>
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>

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
          <NavLink to={"/publish"} className="button">
            Vends tes articles
          </NavLink>
        </nav>
      )}
    </header>
  );
};

export default Header;
