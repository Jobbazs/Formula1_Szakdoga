import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import HomePage from "./pages/home";
import GrandPrixPage from "./pages/grand_prix";
import DriversPage from "./pages/driver";
import ConstructorPage from "./pages/constructors";
import CircuitPage from "./pages/circuit";
import LoginPage from "./pages/login";
import StatisticsPage from "./pages/statistics";

import AdminDriverPage from "./adminPages/adminDriverPage";
import AdminGrandPrixPage from "./adminPages/adminGrandPrixPage";
import AdminConstructorPage from "./adminPages/adminConstructorPage";
import AdminCircuitPage from "./adminPages/adminCircuitPage";
import AdminStatisticsPage from "./adminPages/adminStatistics";

import DriverDetailPage from "./pages/detailPages/driverDetail";
import GrandPrixDetailPage from "./pages/detailPages/grandPrixDetail";
import ConstructorDetailPage from "./pages/detailPages/constructorDetail";
import CircuitDetailPage from "./pages/detailPages/circuitDetail";

import { ThemeProvider } from "./components/themeContext";

import "./styles/index.css";
import "./styles/navbar.css";
import "./styles/home.css";

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("role") === "admin",
  );

  return (
    <ThemeProvider>
      <Router>
        <Navbar isAdmin={isAdmin} onLogout={() => setIsAdmin(false)} />

        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route
              path="/statistics"
              element={<StatisticsPage isAdmin={isAdmin} />}
            />

            <Route
              path="/grand_prix"
              element={<GrandPrixPage isAdmin={isAdmin} />}
            />
            <Route path="/grandprix/:id" element={<GrandPrixDetailPage />} />

            <Route path="/driver" element={<DriversPage isAdmin={isAdmin} />} />
            <Route path="/driver/:id" element={<DriverDetailPage />} />

            <Route
              path="/constructor"
              element={<ConstructorPage isAdmin={isAdmin} />}
            />
            <Route path="/constructor/:id" element={<ConstructorDetailPage />} />

            <Route path="/circuit" element={<CircuitPage isAdmin={isAdmin} />} />
            <Route path="/circuit/:id" element={<CircuitDetailPage />} />

            <Route
              path="/login"
              element={<LoginPage onLoginSuccess={() => setIsAdmin(true)} />}
            />

            <Route path="/admin/drivers" element={<AdminDriverPage />} />
            <Route path="/admin/grandprix" element={<AdminGrandPrixPage />} />
            <Route path="/admin/constructors" element={<AdminConstructorPage />} />
            <Route path="/admin/circuits" element={<AdminCircuitPage />} />
            <Route path="/admin/statistics" element={<AdminStatisticsPage />} />

            <Route
              path="*"
              element={<div className="not-found">404 - Oldal nem található</div>}
            />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;