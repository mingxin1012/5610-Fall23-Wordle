import {React} from 'react';
import './Board.css'; 

const Board = ({ guesses, currentGuess, wordLength, maxGuesses, guessResults }) => {
    const emptyCells = Array.from(Array(wordLength - currentGuess.length));
    
    return (
      <div className="board">
        {guesses.map((guess, guessIndex) => (
            <div key={guessIndex} className="row">
            {guess.split('').map((letter, letterIndex) => (
                <div key={letterIndex}
                    className={`box ${guessResults[guessIndex]?.[letterIndex]}`}>
                {letter}
                </div>
            ))}
            </div>
        ))}
        {Array.from(Array(maxGuesses - guesses.length)).map((_, i) => (
          <div key={i} className="row">
            {Array.from(Array(wordLength)).map((_, j) => (
              <div key={j} className="cell"></div>
            ))}
          </div>
        ))}
      </div>
    );
  };
  
  export default Board;
