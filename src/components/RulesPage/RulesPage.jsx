import React from 'react';
import './RulesPage.css';

function RulesPage() {
    return (
        <div className="rules-container">
            <div className="rules-title">Wordle Game Rules</div>
            
            <div className="rules-section">
                <div className="rules-subtitle">Overview:</div>
                <p className="rules-description">Wordle is a word guessing game where players aim to find a hidden word in the fewest attempts possible. The word is selected by the game and is not visible to the player.</p>
            </div>

            <div className="rules-section">
                <div className="rules-subtitle">General Rules:</div>
                <ol className="rules-description">
                    <li>The game provides immediate feedback on the correctness and placement of letters guessed.</li>
                    <li>Green indicates that the letter is correct and in the correct position.</li>
                    <li>Yellow indicates that the letter is correct but in the wrong position.</li>
                    <li>Gray indicates that the letter is not in the word at all.</li>
                    <li>Players continue guessing until they've either discovered the word or exhausted their allotted attempts.</li>
                </ol>
            </div>

            <div className="rules-section">
                <div className="rules-subtitle">Game Modes:</div>
                <div className="rules-description">
                    <strong>Normal Mode:</strong><br />
                    <span><strong>Objective:</strong> Guess a hidden 6-letter word.</span><br />
                    <span><strong>Attempts:</strong> Players are given 6 opportunities to guess the word correctly.</span><br />
                    <br />
                    <strong>Hard Mode:</strong><br />
                    <span><strong>Objective:</strong> Guess a hidden 7-letter word.</span><br />
                    <span><strong>Attempts:</strong> Players only have 5 opportunities to guess the word correctly.</span>
                </div>
            </div>
        </div>
    );
}

export default RulesPage;
