var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern=[];
var level = 0;
var started = false;


$(document).keypress(()=>{
if(!started){
  $('#level-title').text('Level '+level)
  nextSequence();
  started=true
}
})
$('.btn').click(function(){
  var userChosenColor = $(this).attr('id');
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor)
  animatePress(userChosenColor)
  checkAnswer(userClickedPattern.length-1)

});

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    console.log('success')
   if(userClickedPattern.length===gamePattern.length){
    setTimeout(()=>{
      nextSequence()
    },1000)
   }  
  }else{
    playSound('wrong')
    $('body').addClass('game-over')
    setTimeout(()=>{
      $('body').removeClass('game-over')
    },200)
    $('#level-title').text('Game Over, Press Any Key to Restart')
    startOver()
  }
  }


function nextSequence() {

    // Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
    // nextSequence(), update the h1 with this change in the value of level.
    userClickedPattern=[];
  level++
  $('#level-title').text('Level '+level)
  
  var randomnumber = Math.floor(Math.random() * 4);
  console.log(randomnumber);
  randomChosenColor = buttonColors[randomnumber];
  console.log(randomChosenColor);
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
    playSound(randomChosenColor)
   
}


function playSound(name){
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}




function animatePress(currentColor){
  $('#'+currentColor).addClass('pressed') 
  
  setTimeout(()=>{
    $('#'+currentColor).removeClass('pressed') 
  },100)
}



function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}

