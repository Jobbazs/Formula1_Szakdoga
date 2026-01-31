import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">F1 STATS</div>
        <div className="navbar-links">
          <Link className="navbar-link" to="/">Home</Link>
          <Link className="navbar-link" to="/grand-prix">Grand Prix</Link>
          <Link className="navbar-link" to="/drivers">Drivers</Link>
          <Link className="navbar-link" to="/teams">Teams</Link>
          <Link className="navbar-link" to="/circuits">Circuits</Link>
          <Link className="navbar-link" to="/login">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
