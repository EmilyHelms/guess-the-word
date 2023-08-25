const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

// Display symbols as placeholders for the chosen word's letters
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
       console.log(letter);
       placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

guessLetterButton.addEventListener("click", function (e) {
    e.preventDefault();
    // Empty message paragraph
    message.innerText = "";
    // Grab what was entered in the input
    const guess = letterInput.value;
    // Make sure that it is a single letter
    const goodGuess = validateInput(guess);

    if (goodGuess) {
      // We've got a letter! Let's guess!
      makeGuess(guess);
    }
    letterInput.value = "";
});

const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        // Check to see if the input is empty
        message.innerText = "Please enter a letter.";
    } else if (input.length > 1) {
        // Check to see if more than one letter was typed
        message.innerText = "Please enter a single letter.";
    } else if (!input.match(acceptedLetter)) {
        // Check for a number, special character, or anything that is not a letter
        message.innerText = "Please enter a letter from A to Z.";
    } else {
        // A single letter was entered, thus satisfying the condition
        return input;
    }   
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already guessed that letter. Try again."
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
    }
};

const showGuessedLetters = function () {
    // Clear the list first
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray) {
       if (guessedLetters.includes(letter)) {
       revealWord.push(letter.toUpperCase());
       } else {
         revealWord.push("●");
       }
    }
    //console.log(revealWord);
    wordInProgress.innerText = revealWord.join("");
    checkIfWin();
};

const checkIfWin = function () {
   if (word.toUpperCase() === wordInProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class ="highlight">Congratulations! You guessed the correct word!</p>`;
   }
};

