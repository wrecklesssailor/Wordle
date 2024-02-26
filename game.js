
import { generate } from "random-words";
import swal from 'sweetalert';



/* Variables */
const guesses = [[]];
let nextEmptySpot = 0;
let nextEmptyRow = 0;

export function getWord() {
    return generate({
        minLength: 6,
        maxLength: 6
    })
}

function getCurrentGuessArr() {
    const numberOfGuesses = guesses.length;
    return guesses[numberOfGuesses - 1];
}

export function backspace() {
    const guessArr = getCurrentGuessArr();
    
    if (guessArr.length != 0) {
        nextEmptySpot--;
        guessArr.pop();
        let elementId = (nextEmptyRow) + "-" + (nextEmptySpot);
        let availibleElement = document.getElementById(elementId);
        availibleElement.textContent = "";
    
        console.log(elementId);
        console.log(guesses);
    }
    
}

export function clear() {
    let guessArr = getCurrentGuessArr();
    const clearButton = document.getElementById("clear");
    clearButton.addEventListener("click", () => {

        for (let i = 0; i < guessArr.length; i++) {
            let elementId = (nextEmptyRow) + "-" + i;
            let availibleElement = document.getElementById(elementId);
            
            availibleElement.textContent = "";
        }
        
        guessArr.length = 0;

        nextEmptySpot = 0;
    });
    

}

export function updateGuess(letter) {
    const guessArr = getCurrentGuessArr();
    let elementId = nextEmptyRow + "-" + nextEmptySpot;

    if (guessArr.length < 6) {
        let availibleElement = document.getElementById(elementId);
        
        guessArr.push(letter);
        nextEmptySpot++; 
        availibleElement.textContent = letter;


        console.log(elementId);
        console.log(guesses);
    } else { 
        let availibleElement = document.getElementById(elementId);
        
        guesses.push([letter]);
        nextEmptySpot++; 
        availibleElement.textContent = letter;


        console.log(elementId);
        console.log(guesses);
    }
}


export function enter(answerKey) {
    const enterButton = document.getElementById("enter");
    
    enterButton.addEventListener("click", () => {
        let guessArr = getCurrentGuessArr();
        let answerArr = answerKey;
        
        const getAnswer = (a, b) => {
            let x = a.toString();
            let y = b.toString();

            return x.toLowerCase() === y.toLowerCase();
        }

        if (getAnswer(guessArr, answerArr)) {
            
            for (let i = 0; i <= guessArr.length - 1; i++) {
                let elementId = nextEmptyRow + "-" + i;
                let availableElement = document.getElementById(elementId);

                availableElement.classList.add("correct");
            }

            swal({
                title: "Good job!",
                text: "You guessed the correct word!",
                icon: "success",
                button: {
                    text: "New Word",

                }
            }).then(() =>{
                window.location.reload();
            });;

        } else {
            guessArr.forEach((letter, index) => {
                let elementId = nextEmptyRow + "-" + index;
                let availableElement = document.getElementById(elementId);
                
                if (letter === answerArr[index]) {
                    availableElement.classList.add("correct");
                } else if (answerArr.includes(letter)) {
                    availableElement.classList.add("wrong-spot");
                } else {
                    availableElement.classList.add("wrong");
                }
            });

            nextEmptyRow++;
            nextEmptySpot = 0;
        }
});}


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
