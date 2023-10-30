import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-container">
      <h1>Welcome to Wordle Game</h1>
      
      <div className="buttons-container">
        <Link className="fancy-button" to="/game/normal">Start Normal Game</Link>
        <Link className="fancy-button" to="/game/hard">Start Hard Game</Link>
        <Link className="fancy-button" to="/rules">Game Rules</Link>
      </div>
    </div>
  );
}

export default HomePage;
