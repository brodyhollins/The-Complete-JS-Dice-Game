/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlaying, diceBefore, setScore;

init();

document.querySelector(".btn-roll").addEventListener("click", function () {
    if (gamePlaying) {
        //When the roll dice is clicked
        //1. Get a random number
        var dice = Math.floor(Math.random() * 6) + 1;
        setScore = document.getElementById("topScore").value;
        //2.Display result
        var diceDOM = document.querySelector(".dice");
        diceDOM.style.display = "block";
        diceDOM.src = "dice-" + dice + ".png";

        //3.Update round score IF the rolled number was not a 1
        if (dice !== 1) {
            //Add score
            if ((dice === 6) && (diceBefore == 6)) {
                scores[activePlayer] = 0;
                document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];
                nextPlayer();
            }
            else {
                diceBefore = dice;
            }
            roundScore += dice;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
        console.log(dice);
    }

});

document.querySelector(".btn-hold").addEventListener("click", function () {
    if (gamePlaying) {
        //Add current score to player score
        scores[activePlayer] += roundScore;
        //Update UI 
        document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];
        //Check if player won the game(score = 100?)
        if (setScore) {
            setScore = setScore;
        }
        else {
            setScore = 10;
        }
        if (scores[activePlayer] >= setScore) {
            document.getElementById("name-" + activePlayer).textContent = "Winner";
            document.querySelector(".dice").style.display = "none";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

function nextPlayer() {
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    diceBefore = 0;
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
    document.querySelector(".dice").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    diceBefore = 0;
    setScore = 100;
    setScore = document.getElementById("topScore").value = "";


    document.querySelector(".dice").style.display = "none";

    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
}
