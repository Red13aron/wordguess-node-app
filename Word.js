const Letter = require("./Letter");

const Word = function (string) {
    //variables for holding the letter and whether its been guessed, intially set to false
    this.wordHeld = [];

    for (let i = 0; i<string.length; i++){
        this.wordHeld[i] = new Letter(string[i]);
    }

    this.myWord = function () {
        let word = ``;
        for(let i = 0; i<this.wordHeld.length; i++){
            word += this.wordHeld[i].myLetter();
        }
        return word;
    }

    this.checkLetter = function (guessedLetter) {
        let guess = false;
        for(let i = 0; i<this.wordHeld.length; i++){
            if(this.wordHeld[i].checkLetter(guessedLetter) === true){
                guess = true;
            }
        }
        return guess;
        
    }
};


module.exports = Word;
