
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var gameStarted = false;

// 1. user cicks any button to start the game
$(document).keypress(function () {
  if (!gameStarted) {
    gameStarted = true;
    nextSequence();
  }
});


$("button").click(function () {
  var userChosenColor = $(this).attr("class");
  userClickedPattern.push(userChosenColor);   //3. Suppose user clicks red button,red button is pushed
  playSound(userChosenColor);                 //10. Suppose red is pushed    14.green is pushed (now 2 elements in this array)
  animatePress(userChosenColor);
  // let lastElement = userClickedPattern[userClickedPattern.length-1];
  checkAnswer(userClickedPattern.length - 1);   //4. index 0 of userClickedPattern (red)      11. now,index 0 (red)     15. index 1 (green)
});


function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel])   //5. game pattern index 0 and userCLickedArray index 0 both are red so move forward
  //12. again index 0 of both arrays , red and red are same
  //15. now,both arrays index 1 have green
  {
    if (userClickedPattern.length === gamePattern.length) { //6. true becz both have 1 elements         13.false becz userCLickedPattern has 1 and gamePAttern has 2 elements
      //16. true,becz both have 2 elements (carries same process untill ans goes wrong)
      setTimeout(function () {
        nextSequence(); // 7. again      14.again
      }, 1000);

    }
  }
  else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);


    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}


function nextSequence() {
  userClickedPattern = [];//8. empty this array    
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);//2. Suppose red color is pushed         9. Suppose green is pushed now
  $("." + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  level++;
  $("h1").text("Level " + level);
}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function () {
    $("." + currentColor).removeClass("pressed");
  }, 100);
};


function startOver() {
  level = 0;
  gameStarted = false;
  gamePattern = [];

}
