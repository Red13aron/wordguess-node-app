const inquirer = require("inquirer");
const Word = require("./Word");
const libraryWords = [`Fishhook`,
    `Rhythmic`, `Numbskull`, `Wildebeest`,
    `Phlegm`, `Dwarves`, `Sphinx`];
let lettersGuessed = [];
let isGuessed = false;
let currWord;
let randomWordNum = Math.floor(Math.random() * 7)
for (let i = 0; i < libraryWords.length; i++) {
    if (i === randomWordNum) {
        currWord = new Word(libraryWords[i]);
    }
}
let guessesLeft = 10;

//sets up the game
function setUp() {
    inquirer.
        prompt([
            {
                name: "again",
                message: "Would you like to play again? Y/N",
                type: "input"
            }
        ])
        .then(function (answer) {
            if (answer.again === `Y`) {
                randomWordNum = Math.floor(Math.random() * 7)
                for (let i = 0; i < libraryWords.length; i++) {
                    if (i === randomWordNum) {
                        currWord = new Word(libraryWords[i]);
                    }
                }
                guessesLeft = 10;
                isGuessed = false;
                lettersGuessed = [];
                wordGame();
            }
            else{
                console.log(`Well it was fun while it lasted...`)
            }
        });

}


function wordGame() {
    // Prompt for a Letter
    console.log(`Here's the current word: ${currWord.myWord()}`);
    inquirer
        .prompt([
            {
                name: "guess",
                message: "What letter would you like to guess?",
                type: "input",

            }
        ])
        .then(function (answer) {
            isGuessed = false;
            for (let i = 0; i < lettersGuessed.length; i++) {
                if (lettersGuessed[i] === answer.guess) {
                    isGuessed = true;
                }
            }
            if (currWord.checkLetter(answer.guess) === true && !isGuessed) {
                console.log(`You got one! ${answer.guess} was correct!`);
                lettersGuessed.push(answer.guess);
                currWord.myWord();
                if (currWord.myWord().indexOf(`_`) === -1) {
                    console.log(`Congratulations! You guessed the word ${currWord.myWord()}!`);
                    setUp();
                }
                else {
                    wordGame();
                }

            }
            else if(isGuessed === true){
                console.log(`Please guess a different letter.  I won't count this one ;D`);
                wordGame();
            }
            else {
                console.log(`I'm sorry ${answer.guess} isn't in this word`);
                lettersGuessed.push(answer.guess);
                guessesLeft--;
                console.log(`You have ${guessesLeft} guesses left.`);
                if (guessesLeft === 0) {
                    console.log(`I'm sorry you've run out of guesses :C`);
                    setUp();
                }
                else {
                    wordGame();
                }
            }
        });
}


wordGame();


