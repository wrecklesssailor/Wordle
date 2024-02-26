import { createBoxes, getWord, updateGuess ,backspace, clear, enter } from "./game.js";

document.addEventListener("DOMContentLoaded", () => {
    let secretWord = getWord();
    let answerKey = secretWord.split("");

    console.log(answerKey);
    
    createBoxes();
    clear();
    enter(answerKey);

    document.onkeydown = function(e) {
        var letter = e.key;
        const regex = /^[a-zA-Z]$/;

        if (regex.test(letter)) {
            updateGuess(letter);
        } else if (letter === "Backspace") {
            backspace();
        } else if (letter === "Enter") {

            // TODO: Enter functionality

        } 
    }
});