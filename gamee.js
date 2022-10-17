var buttonColours=["red","green","blue","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=true;
var level=1;
$(document).on("keydown",function(){
    if(started){
    nextSequence();
    started=false;
}});
function nextSequence(){
    userClickedPattern=[];
    $("h1").text("Level "+level);
    var randomNumber=Math.random();
    randomNumber=randomNumber*4;
    randomNumber=Math.floor(randomNumber);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    level++;
}
$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animate(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});
function animate(key){
   var but= $("#"+key).addClass("pressed");
    setTimeout(function(){
        but.removeClass("pressed");
    },100);
}
function playSound(key2){
    var audio=new Audio("sounds/"+key2+".mp3");
    audio.play();
}
function checkAnswer(index){
    if(userClickedPattern[index]===gamePattern[index]){
        if(userClickedPattern.length===gamePattern.length){
            nextSequence();
        }
    }
    else{
        playSound("wrong");
       var wrongg= $("body").addClass("game-over");
       $("h1").text("game over.Press any key to restart");
        setTimeout(function(){
            wrongg.removeClass("game-over");
        },100);
        startOver();
    }

}
function startOver(){
    level=1;
    gamePattern=[];
    started=true;
}