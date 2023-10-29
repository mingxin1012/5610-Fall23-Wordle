import React from 'react';

const LandingPage = ({ onGameModeSelection }) => {
  return (
    <div>
      <h1>Welcome to Wordle Game</h1>
      <button onClick={() => onGameModeSelection('normal')}>
        Normal Difficulty
      </button>
      <button onClick={() => onGameModeSelection('hard')}>
        Hard Difficulty
      </button>
    </div>
  );
};

export default LandingPage;