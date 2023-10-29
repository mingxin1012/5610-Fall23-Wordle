import { useState, useEffect } from 'react'
import Board from '../Board/Board'

import {sixLetterWordSet, sevenLetterWordSet} from '../../utils/wordSet.js';
import { isOnlyLetters, isCorrectLength, isWordInList, checkGuess } from '../../utils/wordUtils';

import './Game.css'

const Game = ({ mode }) => {

    const isHardMode = mode === 'hard';
    const wordLength = isHardMode ? 7 : 6;
    const maxGuesses = isHardMode ? 5 : 6;
    const wordSet = isHardMode ? sevenLetterWordSet : sixLetterWordSet;

    const getRandomWord = (words) => {
        const randomIndex = Math.floor(Math.random() * words.length);
        return words[randomIndex];
    };

    const [gameCompleted, setGameCompleted] = useState(false);
    const [guesses, setGuesses] = useState([]);
    const [guessResults, setGuessResults] = useState([]);
    const [targetWord, setTargetWord] = useState(getRandomWord(wordSet));
    
    const [currentGuess, setCurrentGuess] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const [showError, setShowError] = useState(false);

    const handleInputChange = (event) => {
        setCurrentGuess(event.target.value.toUpperCase());
    };

    const handleSubmitGuess = () => {
        if (!isCorrectLength(currentGuess, wordLength)) {
            setShowError(true);
            setErrorMessage(`Word must be ${wordLength} letters.`);
        } else if (!isOnlyLetters(currentGuess)) {
            setShowError(true);
            setErrorMessage(`Word must only contains letters.`);
        } else if (!isWordInList(currentGuess)) {
            setShowError(true);
            setErrorMessage(`Not in word list.`);
        } else {
            setGuesses([...guesses, currentGuess]);
            setCurrentGuess('');
            console.log('current guess is ', currentGuess, ' targetword is ', targetWord);
            if (currentGuess === targetWord.toUpperCase()) {
                setGameCompleted(true);
            }
            const result = checkGuess(currentGuess.split(''), targetWord.toUpperCase());

            setGuessResults([...guessResults, result]);
        }
    }

    const handleRestartGame = () => {
        setGuesses([]);
        setGuessResults([]);
        setTargetWord(getRandomWord(wordSet));
        setCurrentGuess('');
        setGameCompleted(false); // Reset the completion state
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          handleSubmitGuess();
        }
      };
    

    useEffect(() => {
        if (showError) {
            const timer = setTimeout(() => {
            setShowError(false);
            }, 2500); 

            return () => clearTimeout(timer);
        }
    }, [showError]);

    return (
    <div className="App">
        <h1>Wordle Clone A</h1>
        <Board 
        guesses={guesses} 
        currentGuess={currentGuess} 
        wordLength={wordLength} 
        maxGuesses={maxGuesses} 
        guessResults = {guessResults}
        />
        <div className="input-container">
            <input
            type="text"
            value={currentGuess}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            maxLength={wordLength}
            />
            <button onClick={handleSubmitGuess}>Submit Guess</button>
        </div>
        {showError && (
            <div className="errorMessage">
                {errorMessage}
            </div>
        )}
        {gameCompleted && (
            <div className="overlay">
                <div className="overlay-content">
                    <p>Congratulations! Would you like to try again?</p>
                    <button onClick={handleRestartGame}>Try Again</button>
                </div>
            </div>
        )}
    </div>
  );
};

export default Game;

