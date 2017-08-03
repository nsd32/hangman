 // Variables
    var myArray = [["broncos", "assets/images/broncos.png"], ["nuggets", "assets/images/nuggets.jpg"], ["avalanche", "assets/images/avalanche.jpg"], ["rockies", "assets/images/rockies.png"], ["buffaloes", "assets/images/buffaloes.jpg"], ["rams", "assets/images/rams.png"], ["pioneers", "assets/images/pioneers.jpg"]];

    var word = document.getElementById('word');
    var guess = document.getElementById('letters-guessed');
    var guessRemaining = document.getElementById('guess-remaining');
    var wins = document.getElementById('wins');
    
    var wordArray = [];
    var guessCount = 6;
    var winsCount = 0;
    var missedGuessArray = [];
    var usedLetterArray = [];
    var wordInfoArray = myArray[getRandomNumber()];
    var randomWord = wordInfoArray[0];
    var randomWordImage = wordInfoArray[1];
    var loserImage = "assets/images/loser.jpeg"
    var winAudio = new Audio('assets/music/winner.mp3');
    var loseAudio = new Audio('assets/music/loser.mp3');
    console.log(randomWord);
    console.log(randomWordImage);

    // Appending wordArray with a "_ " for each letter of randomWord
    appendWordArray(randomWord);

    // Displaying the contents of wordArray (a dash for each letter in randomWord)
    word.innerHTML = wordArray.join(" ");

    // Displaying the contents of guessArray (empty to start - no dashes)
    guess.innerHTML = missedGuessArray.join(" ");

    // Displaying the win total to start the game
    wins.innerHTML = 0;
    
    // Function to return a new word after the first game
    function getRandomWord() {
      var newArray = myArray[getRandomNumber()];
      var newWord = newArray[0];
      newArray.push(newWord);
      var newImage = newArray[1];
      newArray.push(newImage);

      return newArray;
      console.log(newWord);
    }

    // User taps button to reset game after a win
    // document.getElementById("button").addEventListener("click", function() {
    //   resetGame();
    //   audioPause();
    // });

    // Function to append wordArray with a dash for every letter in randomWord. Takes in a string (randomWord)
    function appendWordArray(str) {
      for (i = 0; i < str.length; i++) {
        wordArray.push("_ ");
      }
    }

    // Function to get a random number to be used as the index to get a random word out of wordArray
    function getRandomNumber() {
      return Math.floor(Math.random() * myArray.length);
    }

    // Resets game
    function resetGame() {

      var newWordAndImage = getRandomWord()
      randomWord = newWordAndImage[0];
      randomWordImage = newWordAndImage[1];
          
      guessCount = 6;
      guessRemaining.innerHTML = guessCount;
      wordArray = [];
      missedGuessArray = [];
      usedLetterArray = [];
      appendWordArray(randomWord);
      console.log(randomWord);
      console.log(randomWordImage);
      
      word.innerHTML = wordArray.join(" ");
      guess.innerHTML = missedGuessArray.join(" ");
      // document.getElementById('img-src').src = "";
      // audio.pause();
    
    }

    function audioPause() {
      if (wordArray.includes("_ ")) {
        winAudio.pause();
        winAudio.currentTime = 0.0;
        loseAudio.pause();
        loseAudio.currentTime = 0.0;
      }
    }
     
  

    document.onkeyup = function(event) {
  
      // If key selected hasn't been used
      if (!usedLetterArray.includes(event.key) && !randomWord.includes(event.key)) {

        // Append usedLetterArray with key selected
        usedLetterArray.push(event.key);
        
        // Decrease guessCount
        guessCount -= 1;

        // Display new guessCount
        guessRemaining.innerHTML = guessCount;

      } 
        
      // Check if key selected equals each letter of randomWord
      for (i = 0; i < randomWord.length; i++) {

        if (event.key === randomWord[i]) {

          // If yes, change index value of wordArray from "_ " to key selected
          wordArray[i] = event.key;

          // Display updated wordArray
          word.innerHTML = wordArray.join(" ");

        }

      }
        
      // If randomWord doesn't include the key selected AND guessArray doesn't include the key selected
      if (!randomWord.includes(event.key) && !missedGuessArray.includes(event.key)) {
        
        // Add key selected to end of guessArray
        missedGuessArray.push(event.key);

        // Display updated guessArray
        guess.innerHTML = missedGuessArray.join(" ");
      
      } 

      // If wordArray (correct guesses) = randomWord
      if (wordArray.join("") === randomWord && !wordArray.includes("_ ")) {
        // alert('you win!');
        
        winsCount++
        document.getElementById('wins').innerHTML = winsCount;
        document.getElementById('img-src').src = randomWordImage;
        
        winAudio.play();
        resetGame();

      } 


      // If guesses remaining is less than 1
      if (Number(guessRemaining.innerHTML) < 1) {

        document.getElementById('img-src').src = loserImage;
        loseAudio.play();
        resetGame();

      }
      

    };