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





// //----------------------------

// //function to get user input 

// //

// //---------------------------

// //function to leeop through all keys

// //---------------------------

// //function to play sound

// //function to stop sound

// //---------------------------

// //make function to change light of keys

// //make function to iterate the light through the keys

// //-------------------------------

// //action listeners for for user input

// //-------------------------------

// //function to display a score

// //function to get random value for the sequence pattern 


//-------------------------test code ------------------------------------------


var settings = {
    sequence: [],
    round: 0,
    playNumber: 0,
    speed: 800,
    clicked: 0

}


$(document).ready(function() {
    var audio = $("#sound");

    function animate(divid) {


        // Increase round speed.
        if (settings.round > 1) {
            settings.speed = 500
        }

//Logic to make keys light up in sequence

        if (divid == "a") {
            $("#a").css("border-color", "#a50be2");
            $("#tune").attr("src", "assets/f-sharp.wav");
            setTimeout(function() {
                $("#a").css("border-color", "#1d8ca3");
            }, 200);
        } else if (divid == "b") {
            $("#b").css("border-color", "#a50be2");
            $("#tune").attr("src", "assets/f-sharp.wav");
            setTimeout(function() {
                $("#b").css("border-color", "#1d8ca3");
            }, 200);
        } else if (divid == "c") {
            $("#c").css("border-color", "#a50be2");
            $("#tune").attr("src", "assets/f-sharp.wav");
            setTimeout(function() {
                $("#c").css("border-color", "#1d8ca3");
            }, 200);
        } else if (divid == "d") {
            $("#d").css("border-color", "#a50be2");
            $("#tune").attr("src", "assets/f-sharp.wav");
            setTimeout(function() {
                $("#d").css("border-color", "#1d8ca3");
            }, 200);
        }
//play, pause and load audio
        audio[0].pause();
        audio[0].load();
        audio[0].play();

    }
//function to randomise sequence 
    function makeId() {
        var text = "";
        var possible = "abcd";

        for (var i = 0; i < 1; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
            settings.sequence.push(text);

        }

//function to display a random pattern 
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


    // LISTEN 

    function listen() {

        $("#a, #b, #c, #d").on("mousedown", function() {


            if (this.id == settings.sequence[settings.clicked]) {

                if (settings.clicked === settings.sequence.length - 1) {
                    $("#a, #b, #c, #d").off("mousedown");
                    settings.clicked = 0;
                    $("#start").trigger("click");
                } else {
                    console.log("Right!");
                    settings.clicked++;
                }

            } else {
                console.log("WRONG");
                $("#fail").show();
                $("#fail").addClass("bigEntrance");
                audio[0].pause();
                audio[0].load();
                audio[0].play();
                $("#keyboard, #count").css("filter");
                $("#keyboard, #count").css("-webkit-filter");
                settings.clicked = 0;
                $("#a, #b, #c, #d").off("mousedown");

            }

        });

    }

    //BEGIN GAME

    $("#a, #b, #c, #d").on("click", function() {
        animate(this.id)
    });
    $("#start").on("click", function() {
        $("#start").hide();
        $("#keyboard, #count").css("filter");
        $("#keyboard, #count").css("-webkit-filter");
        settings.round++;
        makeId(); // make id and play it
        $("#count").html(settings.round);
        //playit();
    });

    $("#fail").on("click", function() {
        $("#fail").hide();
        settings.sequence = [];
        settings.round = 0;
        settings.playNumber = 0,
        settings.speed = 800;
        settings.clicked = 0;
        $("#start").trigger("click");
    });

}); 