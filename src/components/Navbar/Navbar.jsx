import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/game/normal">Start Normal Game</Link>
      <Link to="/game/hard">Start Hard Game</Link>
      <Link to="/rules">Rules</Link>
    </nav>
  );
}

export default Navbar;


