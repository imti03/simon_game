const buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userPattern = [];
var level = 0
var started = false

function playSound (name) {
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed"),100
    })
}

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userPattern.length-1);
})

if (!started) {    
    $(document).on("keydown",function(){
        $("h1").text("Level "+level);
        nextSequence()
        started = true       
    })
}

function startOver() {
    gamePattern = [];
    level = 0
    started = false
}

function checkAnswer (currentLevel) {
    if (gamePattern[currentLevel] === userPattern[currentLevel]) {
        console.log("success")

        if (gamePattern.length === userPattern.length) {
            setTimeout(nextSequence(),1000)
        }
    }
    else {
        console.log("wrong")
        new Audio("./sounds/wrong.mp3").play()

        $("body").addClass("game-over")

        setTimeout(function() {
            $("body").removeClass("game-over")
        },200)

        $("h1").text("Game Over, Press Any Key to Restart")

        startOver()

    }
}

function nextSequence() {
    userPattern = [];

    var nextNumber = Math.floor(Math.random()*4);

    randomColourChosen = buttonColours[nextNumber];
    gamePattern.push(randomColourChosen);

    $("#"+randomColourChosen).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomColourChosen);

    level++

    $("h1").text("Level "+ level)

}
