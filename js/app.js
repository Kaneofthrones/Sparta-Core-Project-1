// //pseudo code

//-------------------------------------------------------

//object containing all the game settings
var settings = {
    sequence: [], //array for the sequence
    round: 0,
    playNumber: 0,
    speed: 1000,
    clicked: 0,
    highScore: -1,
    player: 1,
    nextPlayer: 2,
    highScoreSaveP1: 0,
    highScoreSaveP2: 0,
    gameRound: 0
}

  //-------------------------------------------------------

$(document).ready(function() {
  var audio = $("#sound");
  var bgAudio = $("#bgMusic");

  //-------------------------------------------------------

  //function to start game
  function startSequence() {
    $("#a, #b, #c, #d, #e").on("click", function() {
        animate(this.id);
        audio[0].play();
        console.log(settings.speed);
    });
  }
  //call functions
  screenDisplay();
  startSequence();
  keyInput();

  //----------------------------------------------------------

  //function to display light sequence
  function animate(divid) {
    //Increase round speed
    if (settings.round == 1 || settings.round == 3) {
        settings.speed -= 60;
    }
    //Logic to make keys light up in sequence and to play sounds
    if (divid == "a") {
      $("#a").css("border-color", "#a50be2");
      $("#tune").attr("src", "assets/scale-c6.wav");
      setTimeout(function() {
        $("#a").css("border-color", "#1d8ca3");
      }, 200);
  	} else if (divid == "b") {
      $("#b").css("border-color", "#a50be2");
      $("#tune").attr("src", "assets/scale-d6.wav");
      setTimeout(function() {
        $("#b").css("border-color", "#1d8ca3");
      }, 200);
  	} else if (divid == "c") {
      $("#c").css("border-color", "#a50be2");
      $("#tune").attr("src", "assets/scale-f6.wav");
      setTimeout(function() {
        $("#c").css("border-color", "#1d8ca3");
      }, 200);
  	} else if (divid == "d") {
      $("#d").css("border-color", "#a50be2");
      $("#tune").attr("src", "assets/scale-g6.wav");
      setTimeout(function() {
        $("#d").css("border-color", "#1d8ca3");
      }, 200);
    } else if (divid == "e") {
      $("#e").css("border-color", "#a50be2");
      $("#tune").attr("src", "assets/scale-a6.wav");
      setTimeout(function() {
        $("#e").css("border-color", "#1d8ca3");
      }, 200);
  	}
	  //pause and load audio for mouseclick
    audio[0].pause();
    audio[0].load();
  }

  //-------------------------------------------------------

  //function to randomise sequence 
  function makeId() {
    var text = "";
    var possible = "abcde";

    for (var i = 0; i < 1; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
      settings.sequence.push(text);
    }
    myLoop();
  }

  //-------------------------------------------------------

  //function to display a random pattern and to loop through the sequence array
  function myLoop() {
    setTimeout(function() {
      animate(settings.sequence[settings.playNumber]);
      settings.playNumber++;
      if(settings.playNumber < settings.sequence.length) {
        myLoop();
        $("#wait").html("Get Ready");
      } else {
        $("#wait").html("Go");
        settings.playNumber = 0;
        listen();
      }
    }, settings.speed)
	}

   //-------------------------------------------------------

  //function to get check user input
  //first IF statement: If the key clicked is equal to the number of the 'clicked' variable and is equal to the same number in the sequence array
  //second IF statement: if the number in the 'clicked' variable is equal one less than the length of the sequence, the 'clicked' variable is set to 0 and the start div will be triggered on click otherwise the if the key clicked is equal to the key in the sequence and that key is clicked in the same order as in the array then proceed onto the next round, increment 'clicked' variable
  //second Else statement: increment the gameRound variable and apply fail conditions to the game changing the player and saving the highscore
  function listen() {
  	$("#a, #b, #c, #d, #e").on("mousedown", function() {
      if (this.id == settings.sequence[settings.clicked]) {
        if (settings.clicked === settings.sequence.length - 1) {
          $("#a, #b, #c, #d, #e").off("mousedown");
          settings.clicked = 0;
          $("#start").trigger("click");
        } else {
            console.log("Right!");
            settings.clicked++;
        }
      } else {
          settings.gameRound++;
          console.log("Wrong");
          displayHighscores();
          $("#fail").html('Player ' + settings.nextPlayer + ' Click here to start');
          //change next player display text
          if(settings.gameRound == 2) {
            $("#fail").html("Start new game");
          }
          $(".popups").show(); 
          $("#count").hide(); 
          $("#wait").hide();
          $("#finalScore").show();         
          $("#showHighScore").html('Player ' + settings.player + '  Highscore:  ' + settings.highScore);
          $("#showCurrentPlayer").hide();
          playAudio(); 
          settings.clicked = 0;
          $("#a, #b, #c, #d, #e").off("mousedown");
        }              
    });
  }

  //------------------------------------------------------

  //function to load and play audio
  function playAudio() {
    audio[0].load();
    audio[0].play();
  }

  //-------------------------------------------------------

  //keyboard input 
  function keyInput(){
	  document.addEventListener('keydown', function(event) {
		  //starting at the A key moving to the right
      if(event.keyCode == 65) {
        $("#a").css("border-color", "#a50be2");
        $("#tune").attr("src", "assets/kick.wav");
        playAudio();
  	    setTimeout(function() {
  	    	$("#a").css("border-color", "#1d8ca3");
  	    	}, 200);      
      } //S key
      else if(event.keyCode == 83) {
      	$("#b").css("border-color", "#a50be2");
        $("#tune").attr("src", "assets/bongo2.wav");
        playAudio();
        setTimeout(function() {
          $("#b").css("border-color", "#1d8ca3");
          }, 200);
      } //D key
      else if(event.keyCode == 68) {
      	$("#c").css("border-color", "#a50be2");
        $("#tune").attr("src", "assets/bongo3.wav");
        playAudio();
        setTimeout(function() {
          $("#c").css("border-color", "#1d8ca3");
          }, 200);

      } //F key
      else if(event.keyCode == 70) {
      	$("#d").css("border-color", "#a50be2");
        $("#tune").attr("src", "assets/bongo4.wav");
        playAudio();
        setTimeout(function() {
          $("#d").css("border-color", "#1d8ca3");
          }, 200);
      } //G key
      else if(event.keyCode == 71) {
      	$("#e").css("border-color", "#a50be2");
        $("#tune").attr("src", "assets/bongo5.wav");
        playAudio();
        setTimeout(function() {
          $("#e").css("border-color", "#1d8ca3");
          }, 200);
      }  //M key
      else if(event.keyCode == 77) {
        $("#tune2").attr("src", "assets/eresMia.mp3");
        bgAudio[0].load();
        bgAudio[0].play();
      } //P key to pause music
      else if(event.keyCode == 80) {
        audio[0].pause();
        bgAudio[0].pause();
      } //R key to resume music
      else if(event.keyCode == 82) {
        bgAudio[0].play();
      }
    });
  }

  //-------------------------------------------------------

  //function to handle start screen and game over screens
  function screenDisplay() { 
    //Click to start button events 
    $("#start").on("click", function() {
      $("#start").hide();
      $("#infoScreen").hide();
      $(".keys").css("margin-top", "6rem") 
      settings.round++;
      settings.highScore++;
      makeId(); // make id and play it
      $("#count").html('Round: ' + settings.round); //display current round
      $("#showCurrentPlayer").html("Player " + settings.player + " score: -> " + settings.highScore);
    });
    //Next Player button events
    $("#fail").on("click", function() {
      settings.player++;
      settings.nextPlayer--;
      //if statement to change players
      if(settings.player > 2) {
        settings.player = 1;
      }
      //counter to change text for next player 
      if(settings.nextPlayer < 1) {
        settings.nextPlayer = 2;
      }
      $("#showCurrentPlayer").show();
      $(".popups").hide();
      $("#count").show();
      $("#wait").show();
      $("#finalScore").hide();
      resetSettings();
      $("#start").trigger("click");
    });
  }

  //-------------------------------------------------------

  //function to reset game settings
  function resetSettings () {
    settings.sequence = [];
    settings.highScore = -1;
    settings.round = 0;
    settings.playNumber = 0;
    settings.speed = 1000;
    settings.clicked = 0;
  }

  //-------------------------------------------------------

  //function to display highscores at the end of each game
  function displayHighscores () {
    //save the scores of both the first and second rounds
    if(settings.gameRound == 1) {
      settings.highScoreSaveP1 = settings.highScore;
    } else if(settings.gameRound == 2) {
      settings.highScoreSaveP2 = settings.highScore;
    }
    //reset the game round after every two rounds, including the highScores
    if(settings.gameRound > 2) {
      settings.gameRound = 1;
      settings.highScoreSaveP1 = 0;
      settings.highScoreSaveP2 = 0;
      $("#finalScore").html("");
    }
    //compare the scores of the first and second rounds and displays the winner, every two rounds
    if((settings.highScoreSaveP1 > settings.highScoreSaveP2) && settings.gameRound == 2) {
      $("#finalScore").html("Player 1 Wins");
    } else if ((settings.highScoreSaveP2 > settings.highScoreSaveP1) && settings.gameRound == 2){
      $("#finalScore").html("Player 2 Wins");
    } else if((settings.highScoreSaveP2 == settings.highScoreSaveP1) && settings.gameRound == 2) {
      $("#finalScore").html("Draw");
    }
  }
}); 
