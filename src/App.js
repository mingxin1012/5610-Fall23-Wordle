import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HomePage from './components/HomePage/HomePage';
import GamePage from './components/GamePage/GamePage';
import RulesPage from './components/RulesPage/RulesPage';
import './App.css';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game/normal" element={<GamePage gameType="normal" />} />
          <Route path="/game/hard" element={<GamePage gameType="hard" />} />
          <Route path="/rules" element={<RulesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


