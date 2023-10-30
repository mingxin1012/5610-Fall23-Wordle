import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Game from './components/Game/Game'
import HomePage from './components/HomePage/HomePage';
import RulesPage from './components/RulesPage/RulesPage';



function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game/normal" element={<Game mode="normal" />} />
          <Route path="/game/hard" element={<Game mode="hard" />} />
          <Route path="/rules" element={<RulesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;