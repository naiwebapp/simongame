var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = new Array();
var userClickedPattern = [];
var level = 0;
var audio;
var started = false;
//Detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().Only call nextSequence() on the first keypress.

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");

  // alert($(this).attr("id"));
  playSound(userChosenColour);

  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

// functions
function nextSequence() {
  //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  // create random color and add the color to the GamePattern array
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  // animate a flash to the button with randomChosenColour
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");

  setTimeout(function() {
    $("." + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success");

    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("Wrong");
    // playSound("wrong");
    // $("body").addClass("game-over");
    // setTimeout(function() {
    //   $("body").removeClass("game-over");
    // }, 200);
    $("#level-title").text("Game Over. Press any Key to restart.");

    startOver();
  }
}

function startOver() {
  // reset the values of level, gamePattern and started variables
  level = 0;
  gamePattern = [];
  started = false;
}
