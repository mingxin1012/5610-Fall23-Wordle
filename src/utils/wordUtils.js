import wordList from '../assets/words_dictionary.json';

export const isOnlyLetters = (word) => /^[A-Za-z]+$/.test(word);

export const isCorrectLength = (word, length) => word.length === length;

export const isWordInList = (word) => wordList.hasOwnProperty(word.toLowerCase());

export const checkGuess = (guess, targetWord) => {
    const result = Array(guess.length).fill('absent');
  
    const targetLetterCounts = targetWord.split('').reduce((acc, letter) => {
      acc[letter] = (acc[letter] || 0) + 1;
      return acc;
    }, {});
  
    // First pass to find correct letters
    guess.forEach((letter, idx) => {
      if (letter === targetWord[idx]) {
        result[idx] = 'correct';
        targetLetterCounts[letter]--;
      }
    });
  
    // Second pass for present but misplaced letters
    guess.forEach((letter, idx) => {
      if (targetWord.includes(letter) && result[idx] !== 'correct') {
        if (targetLetterCounts[letter] > 0) {
          result[idx] = 'present';
          targetLetterCounts[letter]--;
        }
      }
    });
  
    return result;
  };
