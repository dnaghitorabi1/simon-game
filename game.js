let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

$(document).keydown(function() {
  if (!started) {
    setTimeout(function() {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }, 200);

  }
});

$(".btn").click(function() {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern = [];
  level++;

  $("#level-title").text("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4); // Random number between 0 and 3
  let randomChosenColour = buttonColours[randomNumber]; // Choose colour.

  gamePattern.push(randomChosenColour); // Update game pattern.

  $("#" + randomChosenColour).delay(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

function playSound(string) {
  let audio = new Audio("sounds/" + string + ".mp3");
  console.log("audio: " + audio);

  audio.play();
}

function animatePress(string) {
  $("#" + string).addClass("pressed");

  setTimeout(function() {
    $("#" + string).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == (gamePattern[currentLevel])) {
    // Correct
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    // Wrong
    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
