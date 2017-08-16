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
    highScoreSave1: 0,
    highScoreSave2: 0
}

//----------------------------------------------------

$(document).ready(function() {
  var audio = $("#sound");

  //---------------------------------------------------

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

	  //pause and load audio
    audio[0].pause();
    audio[0].load();
  }

  //----------------------------------------------

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

  //function to display a random pattern and to loop through arrays
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

  //------------------------------------------------------

    //function to get check user input 
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
          console.log("Wrong");
          console.log(settings.player);
          $("#fail").html('Player ' + settings.nextPlayer + ' Click here to start');
          $(".popups").show(); 
          $("#count").hide(); 
          $("#wait").hide();         
          $("#showHighScore").html('Player ' + settings.player + '  Highscore:  ' + settings.highScore);
          $("#showCurrentPlayer").hide();
          audio[0].pause();
          audio[0].load();
          audio[0].play();
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
        $("#tune").attr("src", "assets/scale-c6.wav");
        playAudio();
  	    setTimeout(function() {
  	    	$("#a").css("border-color", "#1d8ca3");
  	    	}, 200);      
      } //S key
      else if(event.keyCode == 83) {
      	$("#b").css("border-color", "#a50be2");
        $("#tune").attr("src", "assets/scale-d6.wav");
        playAudio();
        setTimeout(function() {
          $("#b").css("border-color", "#1d8ca3");
          }, 200);
      } //D key
      else if(event.keyCode == 68) {
      	$("#c").css("border-color", "#a50be2");
        $("#tune").attr("src", "assets/scale-f6.wav");
        playAudio();
        setTimeout(function() {
          $("#c").css("border-color", "#1d8ca3");
          }, 200);

      } //F key
      else if(event.keyCode == 70) {
      	$("#d").css("border-color", "#a50be2");
        $("#tune").attr("src", "assets/scale-g6.wav");
        playAudio();
        setTimeout(function() {
          $("#d").css("border-color", "#1d8ca3");
          }, 200);
      } //G key
      else if(event.keyCode == 71) {
      	$("#e").css("border-color", "#a50be2");
        $("#tune").attr("src", "assets/scale-a6.wav");
        playAudio();
        setTimeout(function() {
          $("#e").css("border-color", "#1d8ca3");
          }, 200);
      }
    });
  }

  //-----------------------------------------------------

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
      if(settings.player > 2) {
        settings.player = 1;
      } 
      if(settings.nextPlayer < 1) {
        settings.nextPlayer = 2;
      }
      $("#showCurrentPlayer").show();
      $(".popups").hide();
      $("#count").show();
      $("#wait").show();
      resetSettings();
      $("#start").trigger("click");
    });
  }

  //-----------------------------------------------

  //function to reset game settings
  function resetSettings () {
    settings.sequence = [];
    settings.highScore = -1;
    settings.round = 0;
    settings.playNumber = 0;
    settings.speed = 1000;
    settings.clicked = 0;
  }

}); 
