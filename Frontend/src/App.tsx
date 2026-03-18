import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar';
import HomePage from './pages/home';
import GrandPrixPage from "./pages/grand_prix";
import DriversPage from './pages/driver';
import ConstructorPage from './pages/constructors';
import CircuitPage from './pages/circuit';
import LoginPage from './pages/login';
import AdminDriverPage from "./adminPages/adminDriverPage";
import AdminGrandPrixPage from "./adminPages/adminGrandPrixPages";

import './styles/index.css';
import './styles/navbar.css'; 
import './styles/home.css';

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("role") === "admin"
  );

  return (
    <Router>
      <Navbar isAdmin={isAdmin} onLogout={() => setIsAdmin(false)} />

      <div className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/grand_prix" element={<GrandPrixPage isAdmin={isAdmin} />} />
          <Route path="/driver" element={<DriversPage isAdmin={isAdmin} />} />
          <Route path="/constructor" element={<ConstructorPage />} />
          <Route path="/circuit" element={<CircuitPage />} />
          <Route path="/login" element={<LoginPage onLoginSuccess={() => setIsAdmin(true)} />} />

          <Route path="/admin/drivers" element={<AdminDriverPage />} />
          <Route path="/admin/grandprix" element={<AdminGrandPrixPage />} />

          <Route path="/grandprix/:id" element={<div>Grand Prix részletek oldal</div>} />
          <Route path="/driver/:id" element={<div>Driver részletek oldal</div>} />
          <Route path="/constructor/:id" element={<div>Constructor részletek oldal</div>} />
          <Route path="/circuit/:id" element={<div>Circuit részletek oldal</div>} />

          <Route path="*" element={<div className="not-found">404 - Oldal nem található</div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;