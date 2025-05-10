import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      {/* Logo */}
      <Link className="navbar-logo link" to="/">
        Death & Rebirth
      </Link>
      <ul className="navbar-links">
        {/* Home Page */}
        <li className="link">
          <NavLink to="/">Home</NavLink>
        </li>
        {/* Statistiche */}
        <li>
          <NavLink to="/stats">Statistiche</NavLink>
        </li>
      </ul>
    </nav>
  );
}
