import React from "react";
import { Link, useNavigate } from "react-router-dom";

interface NavbarProps {
  isAdmin: boolean;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAdmin, onLogout }) => {
  const navigate = useNavigate();

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
          <Link className="navbar-link" to="/grand_prix">Grand Prix</Link>
          <Link className="navbar-link" to="/driver">Drivers</Link>
          <Link className="navbar-link" to="/constructor">Constructors</Link>
          <Link className="navbar-link" to="/circuit">Circuits</Link>

          {isAdmin ? (
            <>
              <Link className="navbar-link admin-link" to="/admin" title="Admin">
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
