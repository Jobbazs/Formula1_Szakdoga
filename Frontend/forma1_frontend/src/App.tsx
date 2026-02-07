import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar';
import SmartButtons from './pages/home';
import {GrandPrixPage} from './pages/grand_prix';
// import LoginPage from './login/login_form'; 
import './styles/navbar.css'; 
import './styles/home.css';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      
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