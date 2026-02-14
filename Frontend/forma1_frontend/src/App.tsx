import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar';
import SmartButtons from './pages/home';
import {GrandPrixPage} from './pages/grand_prix';
// import LoginPage from './login/login_form'; 
import './styles/navbar.css'; 
import './styles/home.css';

async function login() {
  console.log("login start");

  // CSRF cookie lekérése
  await fetch("http://localhost:8000/sanctum/csrf-cookie", {
    method: "GET",
    credentials: "include"
  });

  // CSRF token kinyerése cookie-ból
  const getCookie = (name: string) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return decodeURIComponent(match[2]);
    return null;
  };
  const csrfToken = getCookie('XSRF-TOKEN');
//Ezt a login logikát csak át kell majd másolni majd a login oldalunkra. működik a login, jó a cookie, be lehet jelentkezni a lent látható admin felhasználóval.
  // Login request
  const response = await fetch("http://localhost:8000/api/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "X-XSRF-TOKEN": csrfToken || ""
    },
    body: JSON.stringify({
      email: "admin@admin.hu",
      password: "Aa123456"
    })
  });

  const data = await response.json();
  console.log(data);
}


const App: React.FC = () => {
  return (
    <Router>
      <Navbar />

      <button onClick={login}>Login</button>



      <div className="content">
        <Routes>
          <Route path="/" element={<SmartButtons />} />
          <Route path="/grand_prix" element={<GrandPrixPage />} />
          <Route path="/grandprix/:id" element={<div>Grand Prix részletek oldal</div>} />
          <Route path="/driver" element={<div>Ez a Drivers oldal</div>} />
          <Route path="/driver/:id" element={<div>Driver részletek oldal</div>} />
          <Route path="/constructor" element={<div>Ez a Constructor oldal</div>} />
          <Route path="/constructor/:id" element={<div>Constructor részletek oldal</div>} />
          <Route path="/circuit" element={<div>Ez a Circuits oldal</div>} />
          {/* <Route path="/login" element={<LoginPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;