
export const isOnlyLetters = (word) => /^[A-Za-z]+$/.test(word);

export const isCorrectLength = (word, length) => word.length === length;

export async function isWordInList(word) {
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (response.ok) {
            return true;
        } else if (response.status === 404) {
            // Word not found
            return false;
        } else {
            // Handle other HTTP errors
            throw new Error(`API returned status code ${response.status}`);
        }
    } catch (error) {
        console.error('Error in isWordInList:', error);
        // Optionally, rethrow the error or handle it as you see fit
        throw error;
    }
}


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
