import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar';
<<<<<<< HEAD
import HomePage from './pages/home';
import GrandPrixPage from "./pages/grand_prix";
import DriversPage from './pages/driver';
import ConstructorPage from './pages/constructors';
import CircuitPage from './pages/circuit';
import LoginPage from './pages/login';
<<<<<<< HEAD
=======
// import SmartButtons from './pages/home';
import GrandPrixPage from "./pages/grand_prix";
import DriversPage from './pages/driver';
import LoginPage from './pages/login';
import ConstructorPage from './pages/constructors';
>>>>>>> gb_02_28
=======
import AdminDriverPage from "./adminPages/adminDriverPage";
import AdminGrandPrixPage from "./adminPages/adminGrandPrixPages";
>>>>>>> e027bff6b48a0ed9a64a5e3ddd88916579d677a4

import './styles/index.css';
import './styles/navbar.css'; 
import './styles/home.css';
<<<<<<< HEAD
=======
import{imageMap} from './utils/drivers-image-map';
import HomePage from "./pages/home";
import StatisticsPage from "./pages/statistics";


// async function login() {
//   console.log("login start");

//   // CSRF cookie lekérése
//   await fetch("http://localhost:8000/sanctum/csrf-cookie", {
//     method: "GET",
//     credentials: "include"
//   });

//   // CSRF token kinyerése cookie-ból
//   const getCookie = (name: string) => {
//     const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
//     if (match) return decodeURIComponent(match[2]);
//     return null;
//   };
//   const csrfToken = getCookie('XSRF-TOKEN');

//   // Login request
//   const response = await fetch("http://localhost:8000/api/login", {
//     method: "POST",
//     credentials: "include",
//     headers: {
//       "Content-Type": "application/json",
//       "Accept": "application/json",
//       "X-XSRF-TOKEN": csrfToken || ""
//     },
//     body: JSON.stringify({
//       email: "admin@admin.hu",
//       password: "Aa123456"
//     })
//   });

//   const data = await response.json();
//   console.log(data);
// }
>>>>>>> gb_02_28

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("role") === "admin"
  );

  return (
    <Router>
      <Navbar isAdmin={isAdmin} onLogout={() => setIsAdmin(false)} />

<<<<<<< HEAD
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
=======
      {/* <button onClick={login}>Login</button> */}

      <div className="content">
        <Routes>
          {/* <Route path="/" element={<SmartButtons />} /> */}
          <Route path="/" element={<HomePage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="/grand_prix" element={<GrandPrixPage />} />
          <Route path="/grandprix/:id" element={<div>Grand Prix részletek oldal</div>} />
          <Route path="/driver" element={<DriversPage />} />
          <Route path="/driver/:id" element={<div>Driver részletek oldal</div>} />
          <Route path="/constructor" element={<ConstructorPage />} />
          <Route path="/constructor/:id" element={<div>Constructor részletek oldal</div>} />
          <Route path="/circuit" element={<div>Ez a Circuits oldal</div>} />
          <Route path="/login" element={<LoginPage />} />
>>>>>>> gb_02_28
        </Routes>
      </div>
    </Router>
  );
};

export default App;