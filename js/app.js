// //pseudo code

// //I have left in this code as I plan on using it later, but for now I will leave it out
// (function() {
//     // Create audio (context) container
//     var audioCtx = new (AudioContext || webkitAudioContext)();

//     // Table of notes with correspending keyboard codes. Frequencies are in hertz.
//     // The notes start from middle C
//     var notesByKeyCode = {
//         65: { noteName: 'c4', frequency: 261.6, keyName: 'a' },
//         83: { noteName: 'd4', frequency: 293.7, keyName: 's' },
//         68: { noteName: 'e4', frequency: 329.6, keyName: 'd' },
//         70: { noteName: 'f4', frequency: 349.2, keyName: 'f' },
//         71: { noteName: 'g4', frequency: 392, keyName: 'g' },
//     };

//-------------------------------------------------------

var settings = {
    sequence: [], //array for the sequence
    round: 0,
    playNumber: 0,
    speed: 1000,
    clicked: 0,
    highScore: 0,
    player: 1
}

$(document).ready(function() {
  var audio = $("#sound");
  //function to display light sequence
    function animate(divid) {
    // Increase round speed
    // if (settings.round > 1) {
    //     settings.speed = 800
    //   }

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
      //audio[0].play();
    }

//function to randomise sequence 
  function makeId() {
    var text = "";
    var possible = "abcde";
      for (var i = 0; i < 1; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
        settings.sequence.push(text);
      }

//function to display a random pattern and to loop through arrays
  function myLoop() {
    setTimeout(function() {
      animate(settings.sequence[settings.playNumber]);
      settings.playNumber++;
      if (settings.playNumber < settings.sequence.length) {
        myLoop();
        } else {
          settings.playNumber = 0;
          listen();
        }
      }, settings.speed)
  	}
    myLoop();
  }

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
            settings.highScore--;
            console.log(settings.player);
            $(".popups").show(); 
            $("#count").hide();          
            $("#showHighScore").html('Player ' + settings.player + '  Highscore:  ' + settings.highScore);
            audio[0].pause();
            audio[0].load();
            audio[0].play();
            settings.clicked = 0;
            $("#a, #b, #c, #d, #e").off("mousedown");
        	}          
    });
  }

    //function to start game
    $("#a, #b, #c, #d, #e").on("click", function() {
        animate(this.id);
        audio[0].play();
    });

    //keyboard input 
	document.addEventListener('keydown', function(event) {
		//starting at the A key moving to the right
    if(event.keyCode == 65) {
    	$("#a").css("border-color", "#a50be2");
      $("#tune").attr("src", "assets/scale-c6.wav");
      audio[0].load();
      audio[0].play();
	    console.log('a was pressed');
	    setTimeout(function() {
	    	$("#a").css("border-color", "#1d8ca3");
	    	}, 200);
    } //S key
    else if(event.keyCode == 83) {
    	$("#b").css("border-color", "#a50be2");
      $("#tune").attr("src", "assets/scale-d6.wav");
      audio[0].load();
      audio[0].play();
      setTimeout(function() {
        $("#b").css("border-color", "#1d8ca3");
        }, 200);
        console.log('s was pressed');
    } //D key
    else if(event.keyCode == 68) {
    	$("#c").css("border-color", "#a50be2");
      $("#tune").attr("src", "assets/scale-f6.wav");
      audio[0].load();
      audio[0].play();
      setTimeout(function() {
        $("#c").css("border-color", "#1d8ca3");
        }, 200);
        console.log('d was pressed');
    } //F key
    else if(event.keyCode == 70) {
    	$("#d").css("border-color", "#a50be2");
      $("#tune").attr("src", "assets/scale-g6.wav");
      audio[0].load();
      audio[0].play();
      setTimeout(function() {
        $("#d").css("border-color", "#1d8ca3");
        }, 200);
        console.log('f was pressed');
    } //G key
    else if(event.keyCode == 71) {
    	$("#e").css("border-color", "#a50be2");
      $("#tune").attr("src", "assets/scale-a6.wav");
      audio[0].load();
      audio[0].play();
      setTimeout(function() {
        $("#e").css("border-color", "#1d8ca3");
        }, 200);
        console.log('g was pressed');
    }
});
    $("#start").on("click", function() {
      $("#start").hide();
      $("#infoScreen").hide();
      $(".keys").css("margin-top", "6rem")
      
      settings.round++;
      settings.highScore++;
      makeId(); // make id and play it
      $("#count").html('Round: ' + settings.round); //display current round
    });

    $("#fail").on("click", function() {
      settings.player++;
      if(settings.player >= 2) {
        settings.player = 1;
      }

      $(".popups").hide();
      $("#count").show();
      settings.sequence = [];
      settings.highScore = 0;
      settings.round = 0;
      settings.playNumber = 0;
      settings.speed = 800;
      settings.clicked = 0;
      $("#start").trigger("click");
    });
}); 