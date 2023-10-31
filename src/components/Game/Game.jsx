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

    const [gameState, setGameState] = useState(() => {
        const savedState = localStorage.getItem('gameState-' + mode);
        return savedState ? JSON.parse(savedState) : {
            gameCompleted: false,
            gameOver: false,
            guesses: [],
            guessResults: [],
            targetWord: getRandomWord(wordSet),
            currentGuess: ''
        };
    });
    const { gameCompleted, gameOver, guesses, guessResults, targetWord, currentGuess } = gameState;

    const [errorMessage, setErrorMessage] = useState('');
    const [showError, setShowError] = useState(false);

    const handleInputChange = (event) => {
        setGameState(prevState => ({
            ...prevState,
            currentGuess: event.target.value.toUpperCase()
        }));
    };

    const handleSubmitGuess = async () => {
        if (!isCorrectLength(currentGuess, wordLength)) {
            setShowError(true);
            setErrorMessage(`Word must be ${wordLength} letters.`);
            return;
        } 
        if (!isOnlyLetters(currentGuess)) {
            setShowError(true);
            setErrorMessage(`Word must only contains letters.`);
            return;
        } 
        try {
            const isValidWord = await isWordInList(currentGuess);
            if (!isValidWord) {
                setShowError(true);
                setErrorMessage(`Not in word list.`);
                return;
            }
        } catch (error) {
            console.error('Error checking word:', error);
            setShowError(true);
            setErrorMessage('Error checking word:', error);
            return;
        }

        setGameState(prevState => ({
            ...prevState,
            guesses: [...prevState.guesses, currentGuess],
            currentGuess: ''
        }));
        
        console.log('current guess is ', currentGuess, ' targetword is ', targetWord);

        if (currentGuess !== targetWord.toUpperCase() && guesses.length >= maxGuesses - 1) {
            setGameState(prevState => ({
                ...prevState,
                gameOver: true
            }));
        }

        if (currentGuess === targetWord.toUpperCase()) {
            setGameState(prevState => ({
                ...prevState,
                gameCompleted: true
            }));
        }
        const result = checkGuess(currentGuess.split(''), targetWord.toUpperCase());
        
        setGameState(prevState => ({
            ...prevState,
            guessResults: [...prevState.guessResults, result]
        }));
       
    }

    const handleRestartGame = () => {
        localStorage.removeItem('gameState-' + mode);
        setGameState(prevState => ({
            ...prevState,
            gameCompleted: false,
            gameOver: false,
            guesses: [],
            guessResults: [],
            targetWord: getRandomWord(wordSet),
            currentGuess: ''
        }));

    };

    const handleResetClick = () => {
        if (window.confirm('Are you sure you want to reset the game?')) {
            handleRestartGame();
        }
    };
    
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          handleSubmitGuess();
        }
      };
    
    useEffect(() => {
        // Initialize gameState from localStorage
        const savedState = localStorage.getItem('gameState-' + mode);
        if (savedState) {
            setGameState(JSON.parse(savedState));
        } else {
            // Initialize with a fresh game state if nothing in localStorage
            handleRestartGame();
        }
    }, [mode]); 

    // Effect for Auto-Saving
    useEffect(() => {
        // Auto-saving gameState to localStorage
        const autoSave = setTimeout(() => {
          localStorage.setItem('gameState-' + mode, JSON.stringify(gameState));
        }, 500);
      
        return () => clearTimeout(autoSave);
    }, [gameState, mode]);

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
        <h1>Wordle Level - {mode.charAt(0).toUpperCase() + mode.slice(1)}</h1>
        <Board 
        guesses={guesses} 
        currentGuess={currentGuess} 
        wordLength={wordLength} 
        maxGuesses={maxGuesses} 
        guessResults = {guessResults}
        />
        <p></p>
        <div className="input-container">
            <input
            type="text"
            value={currentGuess}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            maxLength={wordLength}
            />
            
        </div>
        <button onClick={handleSubmitGuess} className="submit-button">Submit Guess</button>
        <p></p>
        <button onClick={handleResetClick} className="reset-button">Reset Game</button>
        <p>Please enter a {wordLength} letter word. You have {maxGuesses - guesses.length} attempts remaining.</p>
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
        {gameOver && (
            <div className="overlay">
                <div className="overlay-content">
                    <p>Game Over! The word was {targetWord}. Would you like to try again?</p>
                    <button onClick={handleRestartGame}>Try Again</button>
                </div>
            </div>
        )}
    </div>
  );
};

export default Game;

