import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar';
import HomePage from './pages/home';
import GrandPrixPage from "./pages/grand_prix";
import DriversPage from './pages/driver';
import ConstructorPage from './pages/constructors';
import CircuitPage from './pages/circuit';  // Import hozzáadva
import LoginPage from './pages/login';

import './styles/index.css';
import './styles/navbar.css'; 
import './styles/home.css';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />

      <div className="content">
        <Routes>
          {/* Main pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/grand_prix" element={<GrandPrixPage />} />
          <Route path="/driver" element={<DriversPage />} />
          <Route path="/constructor" element={<ConstructorPage />} />
          <Route path="/circuit" element={<CircuitPage />} />  {/* Route hozzáadva */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Detail pages */}
          <Route path="/grandprix/:id" element={<div>Grand Prix részletek oldal</div>} />
          <Route path="/driver/:id" element={<div>Driver részletek oldal</div>} />
          <Route path="/constructor/:id" element={<div>Constructor részletek oldal</div>} />
          <Route path="/circuit/:id" element={<div>Circuit részletek oldal</div>} />  {/* Detail route hozzáadva */}
          
          {/* 404 - Not Found */}
          <Route path="*" element={<div className="not-found">404 - Oldal nem található</div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;