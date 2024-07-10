import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
const Header = () => {
  return (
    <header>
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>

      <nav>
        <NavLink>S'inscrire</NavLink>
        <NavLink>Se connecter</NavLink>
        <NavLink>Vends tes articles</NavLink>
      </nav>
    </header>
  );
};

export default Header;
