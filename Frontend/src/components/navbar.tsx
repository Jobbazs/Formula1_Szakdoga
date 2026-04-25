import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../components/themeContext";

interface NavbarProps {
  isAdmin: boolean;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAdmin, onLogout }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem("role");
    onLogout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">F1 STATS</div>

        <div className="navbar-links">
          <Link className="navbar-link" to="/">Home</Link>
          <Link className="navbar-link" to="/statistics">Statistics</Link>
          <Link className="navbar-link" to="/grand_prix">Grand Prix</Link>
          <Link className="navbar-link" to="/driver">Drivers</Link>
          <Link className="navbar-link" to="/constructor">Constructors</Link>
          <Link className="navbar-link" to="/circuit">Circuits</Link>

          {isAdmin ? (
            <>
              <Link className="navbar-link admin-link" to="/" title="Admin">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#ffd700">
                  <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.92c.04-.34.07-.69.07-1.08s-.03-.73-.07-1.08l2.32-1.81c.21-.16.27-.46.13-.7l-2.2-3.81c-.13-.24-.42-.32-.66-.24l-2.74 1.1c-.57-.44-1.18-.8-1.86-1.07L14.05 2.4c-.05-.26-.28-.44-.55-.44h-4.4c-.27 0-.5.18-.55.44L8.11 5.1C7.43 5.37 6.82 5.73 6.25 6.17L3.51 5.07c-.24-.08-.53 0-.66.24L.65 9.12c-.14.24-.08.54.13.7l2.32 1.81C3.06 11.98 3 12.34 3 12.7s.03.72.1 1.06L.78 15.57c-.21.16-.27.46-.13.7l2.2 3.81c.13.24.42.32.66.24l2.74-1.1c.57.44 1.18.8 1.86 1.07l.44 2.7c.05.26.28.44.55.44h4.4c.27 0 .5-.18.55-.44l.44-2.7c.68-.27 1.29-.63 1.86-1.07l2.74 1.1c.24.08.53 0 .66-.24l2.2-3.81c.14-.24.08-.54-.13-.7l-2.32-1.81z"/>
                </svg>
              </Link>
              <button className="navbar-link logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link className="navbar-link" to="/login">Login</Link>
          )}

          <button className="theme-toggle-btn" onClick={toggleTheme} title="Téma váltás">
            {theme === "dark" ? (
              // ☀️ nap — sötét módban látszik
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="#ffd700">
                <path d="M12 7a5 5 0 1 0 5 5 5 5 0 0 0-5-5m0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3m0-13a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0V3a1 1 0 0 1 1-1m0 18a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1m11-9a1 1 0 0 1-1 1h-2a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1M4 12a1 1 0 0 1-1 1H1a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1m15.07-7.07a1 1 0 0 1 0 1.41l-1.41 1.41a1 1 0 0 1-1.41-1.41l1.41-1.41a1 1 0 0 1 1.41 0M6.75 17.25a1 1 0 0 1 0 1.41l-1.41 1.41a1 1 0 0 1-1.41-1.41l1.41-1.41a1 1 0 0 1 1.41 0m12.32 2.82a1 1 0 0 1-1.41 0l-1.41-1.41a1 1 0 0 1 1.41-1.41l1.41 1.41a1 1 0 0 1 0 1.41M6.75 6.75a1 1 0 0 1-1.41 0L3.93 5.34a1 1 0 0 1 1.41-1.41l1.41 1.41a1 1 0 0 1 0 1.41"/>
              </svg>
            ) : (
              // 🌙 hold — világos módban látszik
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="#1a1a2e">
                <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;