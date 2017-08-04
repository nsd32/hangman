  
var game = {
  word: document.getElementById("word"),
  guess: document.getElementById("letters-guessed"),
  guessRemaining: document.getElementById("guess-remaining"),
  wins: document.getElementById("wins"),
  wordArray: [], // Will hold dashes for each letter in randomWord to start. Then get populated with correct guesses
  guessCount: 6,
  winsCount: 0,
  missedGuessArray: [], // Missed guesses get appended to this array and displayed to the user
  usedLetterArray: [], // Will hold letters that are guessed AND aren't in the randomWord. Used to decrease guess count only if the key hasn't been selected yet.
  wordInfoArray: [], // Will hold the selected nested array in gameArray
  loserImage: "assets/images/loser.jpeg",
  winAudio: new Audio("assets/music/winner.mp3"),
  loseAudio: new Audio("assets/music/loser.mp3"),

  gameArray: [["broncos", "assets/images/broncos.png"], ["nuggets", "assets/images/nuggets.jpg"], ["avalanche", "assets/images/avalanche.jpg"], ["rockies", "assets/images/rockies.png"], ["buffaloes", "assets/images/buffaloes.jpg"], ["rams", "assets/images/rams.png"], ["pioneers", "assets/images/pioneers.jpg"]],

  // Function to return a new word after the first game
  getRandomWord: function() {
    var newArray = this.gameArray[this.getRandomNumber()];
    var newWord = newArray[0];
    newArray.push(newWord);
    var newImage = newArray[1];
    newArray.push(newImage);

    return newArray;
    console.log(newWord);
  },

  // Function to append wordArray with a dash for every letter in randomWord. Takes in a string (randomWord)
  appendWordArray: function(str) {
    for (i = 0; i < str.length; i++) {
      this.wordArray.push("_ ");
    }
  },

  // Function to get a random number to be used as the index to get a random word out of wordArray
  getRandomNumber: function() {
    return Math.floor(Math.random() * this.gameArray.length);
  },

  // Resets game
  resetGame: function () {

    var newWordAndImage = this.getRandomWord()
    this.randomWord = newWordAndImage[0];
    this.randomWordImage = newWordAndImage[1];
        
    this.guessCount = 6;
    this.guessRemaining.innerHTML = this.guessCount;
    this.wordArray = [];
    this.missedGuessArray = [];
    this.usedLetterArray = [];
    this.appendWordArray(this.randomWord);
    console.log(this.randomWord);
    console.log(this.randomWordImage);
    
    this.word.innerHTML = this.wordArray.join(" ");
    this.guess.innerHTML = this.missedGuessArray.join(" ");

  }

};

    game.wordInfoArray = game.gameArray[game.getRandomNumber()]; // Selecting a random nested array from gameArray

    game.randomWord = game.wordInfoArray[0]; // Selecting the first item in the nested array (randomWord)
    console.log(game.randomWord);

    game.randomWordImage = game.wordInfoArray[1]; // Selecting the the second item in the nested array (image)
    console.log(game.randomWordImage);

    // Appending wordArray with a "_ " for each letter of randomWord
    game.appendWordArray(game.randomWord);

    // Displaying the contents of wordArray (a dash for each letter in randomWord)
    game.word.innerHTML = game.wordArray.join(" ");

    // Displaying the contents of guessArray (empty to start - no underscores)
    game.guess.innerHTML = game.missedGuessArray.join(" ");

    // Displaying the win total to start the game
    game.wins.innerHTML = 0;
    
  
    document.onkeyup = function(event) {
  
      // If key selected hasn't been used
      if (!game.usedLetterArray.includes(event.key) && !game.randomWord.includes(event.key)) {

        // Append usedLetterArray with key selected
        game.usedLetterArray.push(event.key);
        
        // Decrease guessCount
        game.guessCount -= 1;

        // Display new guessCount
        game.guessRemaining.innerHTML = game.guessCount;

      } 
        
      // Check if key selected equals each letter of randomWord
      for (i = 0; i < game.randomWord.length; i++) {

        if (event.key === game.randomWord[i]) {

          // If yes, change index value in wordArray from "_ " to key selected
          game.wordArray[i] = event.key;

          // Display updated wordArray
          game.word.innerHTML = game.wordArray.join(" ");

        }

      }
        
      // If randomWord doesn't include the key selected AND missedGuessArray doesn't include the key selected
      if (!game.randomWord.includes(event.key) && !game.missedGuessArray.includes(event.key)) {
        
        // Add key selected to end of missedGuessArray
        game.missedGuessArray.push(event.key);

        // Display updated missedGuessArray
        game.guess.innerHTML = game.missedGuessArray.join(" ");
      
      } 

      // If wordArray (correct guesses) = randomWord
      if (game.wordArray.join("") === game.randomWord) {
        // alert('you win!');
        
        game.winsCount++
        document.getElementById('wins').innerHTML = game.winsCount;
        document.getElementById('img-src').src = game.randomWordImage;
        
        game.winAudio.play();
        game.resetGame();

      } 

      // If guesses remaining is less than 1
      if (game.guessRemaining.innerHTML < 1) {

        document.getElementById('img-src').src = game.loserImage;
        game.loseAudio.play();
        game.resetGame();

      }    

    };