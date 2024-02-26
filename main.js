import { createBoxes, getWord, updateGuess ,backspace, clear, enter } from "./game.js";

document.addEventListener("DOMContentLoaded", () => {
    let secretWord = getWord();
    let answerKey = secretWord.split("");
    let nextEmptySpot = 0;
    let nextEmptyRow = 0;

    console.log(answerKey);
    
    createBoxes();
    clear(nextEmptyRow, nextEmptySpot);
    enter(answerKey, nextEmptyRow, nextEmptySpot);

    document.onkeydown = function(e) {
        var letter = e.key;
        const regex = /^[a-zA-Z]$/;

        if (regex.test(letter)) {
            updateGuess(letter, nextEmptyRow, nextEmptySpot);
        } else if (letter === "Backspace") {
            backspace();
        } else if (letter === "Enter") {

            // TODO: Enter functionality

        } 
    }
});