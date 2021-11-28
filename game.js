var gamesequence = [];
var colors = ["red", "blue", "green", "yellow"];
var gameLevel = 0;
var userLevel = 0;
var randcolor;
var keypressactive = false;


// For identifying keypress
$(document).keydown(function(event){

  if (gameLevel === 0)
  {
    gameLevel++;
    userLevel = 0 ;
    gamesequence = [];
    generatenextcolor();
    $("h1").text("Level 1");
    keypressactive = true; // For knowing whether game is on or not
  }

});

// Taking user click.
$(".btn").click(function(event){

  if(keypressactive) // For knowing whether game is on or not
  {
    userpressanimate(event.currentTarget.id);
    makesound(event.currentTarget.id);

    var result = checkAnswer(event.currentTarget.id);
    if(result)
    {
      userLevel++;
      if (userLevel === gameLevel)
      {
        gameLevel++;
        userLevel = 0;
        $("h1").text("Level " + gameLevel);
        setTimeout(function(){ generatenextcolor(); }, 1000);
      }
    }
    else
    {
      wronganswer();
    }

  }
});

// For Checking whether correct key is pressed or not
function checkAnswer(currentpress)
{
  if( gamesequence[userLevel] === currentpress)
  {
    return true;
  }
  return false;
}

// If wrong answer is pressed
function wronganswer()
{
  keypressactive = false;
  gameLevel = 0;
  userLevel = 0;
  gamesequence = [];
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 100);

  $("h1").text("You pressed the wrong sequence. Press A key Restart the game.");
}

// Generating next color in the sequence :
function generatenextcolor()
{
  var rand = Math.floor(Math.random()*4) ;
  var randcolor = colors[rand];
  gamesequence.push(randcolor);

  setTimeout(function(){ makesound(randcolor); } , 100);
  animategenerated(randcolor);
}

// Functions for animation and making sounds :
function animategenerated(button)
{
  $("#" + button).fadeOut(100).fadeIn(100);
}

function makesound(button)
{
  var sound = new Audio("sounds/" + button + ".mp3");
  sound.play();
}

function userpressanimate(button)
{
  $("#" + button).addClass("pressed");
  // After 100ms delay function inside setTimeout executes.
  setTimeout(function(){ $("#" + button).removeClass("pressed"); } , 100);

}
