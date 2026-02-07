import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar';
import './styles/navbar.css'; 

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      
      <div className="content">
        <Routes>
          <Route path="/" element={<div>Ez a Home oldal</div>} />
          <Route path="/grand-prix" element={<div>Ez a Grand Prix oldal</div>} />
          <Route path="/drivers" element={<div>Ez a Drivers oldal</div>} />
          <Route path="/teams" element={<div>Ez a Teams oldal</div>} />
          <Route path="/circuits" element={<div>Ez a Circuits oldal</div>} />
          <Route path="/login" element={<div>Ez a Login oldal</div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

//asd