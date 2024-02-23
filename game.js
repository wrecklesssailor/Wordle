
import { generate } from "random-words";


/* Variables */
const word = getWord().split("");
const guesses = [[]];
let nextEmptySpot = 0;
let nextEmptyRow = 0;

function getWord() {
    return generate({
        minLength: 6,
        maxLength: 6
    })
}


function getCurrentGuessArr() {
    const numberOfGuesses = guesses.length;
    return guesses[numberOfGuesses - 1];
}

export function updateGuess(letter) {
    const guessArr = getCurrentGuessArr();
    if (guessArr.length < 6) {
        guessArr.push(letter);

        let elementId = nextEmptyRow + "-" + nextEmptySpot;
        let availibleElement = document.getElementById(elementId);
        if (nextEmptySpot < 5) {
            nextEmptySpot++; 
        }
        availibleElement.textContent = letter;
        console.log(elementId);
    }
}


export function createBoxes() {
    const gameBoard = document.getElementById("game-container");

    for (let i =0; i < 7; i++) {
        const row = document.createElement("div");
        row.classList.add("word-row");
        row.setAttribute("id", i + 1);
        gameBoard.appendChild(row);

        for (let j = 0; j < 6; j++) {
            const box = document.createElement("div");
            box.classList.add("letter-box");
            box.setAttribute("id", i + "-" + j);
            row.appendChild(box);
        }
    }
}
