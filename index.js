const inquirer = require("inquirer");
const Word = require("./Word");
const figlet = require("figlet");
const colors = require("colors");

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


function figletize(string){
    figlet(string, function (err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data)
    });
}

//sets up the game
function setUp() {
    inquirer.
        prompt([
            {
                name: "again",
                message: "Would you like to play again? Y/N".green,
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
            else {
                figlet(`Well it was fun while it lasted...`, function (err, data) {
                    if (err) {
                        console.log('Something went wrong...');
                        console.dir(err);
                        return;
                    }
                    console.log(data)
                });
            }
        });

}


function wordGame() {
    // Prompt for a Letter
    console.log(`Here's the current word: ${currWord.myWord()}`.blue);
    inquirer
        .prompt([
            {
                name: "guess",
                message: "What letter would you like to guess?".blue,
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

                console.log(`You got one! ${answer.guess} was correct!`.green);
                lettersGuessed.push(answer.guess);
                currWord.myWord();
                if (currWord.myWord().indexOf(`_`) === -1) {
                    console.log(`Congratulations! You guessed the word ${currWord.myWord()}!`.green);
                    setUp();
                }
                else {
                    wordGame();
                }

            }
            else if (isGuessed === true) {
                console.log(`Please guess a different letter.  I won't count this one ;D`.red);
                wordGame();
            }
            else {
                console.log(`I'm sorry ${answer.guess} isn't in this word`.red);
                lettersGuessed.push(answer.guess);
                guessesLeft--;
                console.log(`You have ${guessesLeft} guesses left.`.red);
                if (guessesLeft === 0) {
                    console.log(`I'm sorry you've run out of guesses :C`.red);
                    setUp();
                }
                else {
                    wordGame();
                }
            }
        });
}


wordGame();


