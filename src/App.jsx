import React, { useState } from 'react';

import LandingPage from './components/LandingPage/LandingPage.jsx';
import Game from './components/Game/Game.jsx'

const App = () => {
  const [gameMode, setGameMode] = useState(null);

  const handleGameModeSelection = (mode) => {
    setGameMode(mode);
  };

  return (
    <div>
      {gameMode ? (
        <Game mode={gameMode} />
      ) : (
        <LandingPage onGameModeSelection={handleGameModeSelection} />
      )}
    </div>
  );
};

export default App;
