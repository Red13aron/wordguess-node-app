const Letter = function (letter) {
    //variables for holding the letter and whether its been guessed, intially set to false
    this.letterHeld = letter;
    this.letterGuessed = false;

    this.myLetter = function () {
        if (this.letterGuessed) {
            return this.letterHeld;
        }
        else {
            return `_`;
        }
    }

    this.checkLetter = function (guessedLetter) {
        if (this.letterHeld.toLowerCase() === guessedLetter.toLowerCase()) {
            this.letterGuessed = true;
            return this.letterGuessed;
        }
    }
};



module.exports = Letter;
