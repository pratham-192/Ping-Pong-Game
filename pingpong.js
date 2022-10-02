var ball = document.getElementById("ball");
var rod1 = document.getElementById("rod-1");
var rod2 = document.getElementById("rod-2");
var rod1score = document.getElementById("rod-1-score");
var rod2score = document.getElementById("rod-2-score");
var reset=document.getElementById("reset");

//taking names of both players

var player1, player2;
function takenames() {
    do {
        player1 = window.prompt("Enter player-1 name")
    } while (player1 == "" || player1 == null);
    do {
        player2 = window.prompt("Enter player 2 name")
    } while (player2 == "" || player2 == null);
    document.querySelector("#rod-1-title div").innerText = player1;
    document.querySelector("#rod-2-title div").innerText = player2;

}

// function takenamessecondtime(x, y) {
//     document.querySelector("#rod-1-title div").innerText = x;
//     document.querySelector("#rod-2-title div").innerText = y;
// }
let score=0, movement, ballSpeedX = 3, ballSpeedY = 3;
let gameOn = false;

let container = document.getElementById("game-window").getBoundingClientRect();

var speedincreaserX=0.3;
var speedincreaserY=0.3;

//reseting board and maintaining local storage
window.onload=resetgame();

reset.addEventListener("click",resetgame);
function resetgame(){
    console.log("fajd");
    sessionStorage.clear();
    startgame();
}
function startgame() {
    console.log(this);
    let x1 = sessionStorage.getItem("player1name");
    let x1score = sessionStorage.getItem("player1score");
    let x2 = sessionStorage.getItem("player2name");
    let x2score = sessionStorage.getItem("player2score");
    if ((x1 == null || x1score == null) && (x2 == null || x2score == null)) {
        alert("This is the first time you're playing the game. Let's start!!");
        takenames();
        do{
        score=prompt("Enter max game points", "11");
        console.log(score);
    }while(parseInt(score)<=0 || parseInt(score)>21);
    } else {
        if (x1 != null && x2 != null) {
            alert(x1 + " has won " + x1score + " times. \n" + x2 + " has won " + x2score + " times.");
        } else if (x1 != null) {
            alert(x1 + " has won " + x1score + " times.");
        } else alert(x2 + " has won " + x2score + " times.");
    }
    resetBoard();
};

function resetBoard() {
    rod1.style.top = container.top + (container.height - rod1.offsetHeight) / 2 + "px";
    rod2.style.top = container.top + (container.height - rod2.offsetHeight) / 2 + "px";
    ball.style.left = container.left + (container.width - ball.offsetWidth) / 2 + "px";
    ball.style.top = container.top + (container.height - ball.offsetHeight) / 2 + "px";

    gameOn = false;
}

//adding keys functionality
window.addEventListener("keydown", function (event) {
    let rodSpeed = 16;
    let rod2coords = rod2.getBoundingClientRect();
    let rod1coords = rod1.getBoundingClientRect();
    //events for moving rods
    if (event.keyCode == 38 && rod2coords.top - rodSpeed >= container.top) {
        rod2.style.top = rod2coords.top - rodSpeed + "px";
    } else if (event.keyCode == 40 && rod2coords.bottom + rodSpeed <= container.bottom) {
        rod2.style.top = rod2coords.top + rodSpeed + "px";
    } else if ((event.keyCode == 87 || event.keyCode == 119) && rod1coords.top - rodSpeed >= container.top) {
        rod1.style.top = rod1coords.top - rodSpeed + "px";
    } else if ((event.keyCode == 83 || event.keyCode == 115) && rod1coords.bottom + rodSpeed <= container.bottom) {
        rod1.style.top = rod1coords.top + rodSpeed + "px";
    }
})
//event for starting the game
window.addEventListener("keypress", function (event) {
    if (event.code == "Enter" && gameOn == false) {
        gameOn = true;

        //moving of ball
        movement = setInterval(function () {
            let ballCoords = ball.getBoundingClientRect();

            let rod1coords = rod1.getBoundingClientRect();
            let rod2coords = rod2.getBoundingClientRect();

            ball.style.left = ballCoords.left + ballSpeedX + "px";
            ball.style.top = ballCoords.top + ballSpeedY + "px";
            // update coordinates of balls
            ballCoords = ball.getBoundingClientRect();
            if (ballCoords.top < container.top || ballCoords.bottom > container.bottom) {
                ballSpeedY = -ballSpeedY;
            }

            let ballcenter = ballCoords.x + ball.offsetWidth / 2;


            // strike with rod 1
            if (ballcenter <= rod1coords.right) {
                ballSpeedX = -ballSpeedX;

                //game ends
                if (ballCoords.top > rod1coords.bottom || ballCoords.bottom < rod1coords.top) {
                    updateWin("Rod-2");
                }
            }
            //strike with rod 2
            if ((ballcenter) >= rod2coords.x) {
                ballSpeedX = -ballSpeedX;
                if (ballCoords.top > rod2coords.bottom || ballCoords.bottom < rod2coords.top) {
                    updateWin("Rod-1");
                }
            }
        }, 10);
    }
})


//updating score
function updateWin(rod) {
    clearInterval(movement);
    resetBoard();
    if (rod == "Rod-1") rod1score.innerText = parseInt(rod1score.innerText) + 1;
    else if (rod == "Rod-2") rod2score.innerText = parseInt(rod2score.innerText) + 1;

    let x1 = sessionStorage.getItem("player1name");
    let x1score = sessionStorage.getItem("player1score");
    let x2 = sessionStorage.getItem("player2name");
    let x2score = sessionStorage.getItem("player2score");

    if (rod1score.innerText == score) {
        resetBoard();
        rod1score.innerText = 0;
        rod2score.innerText = 0;
        alert(player1 + " wins!!");

        if (x1 == null) {
            sessionStorage.setItem("player1name", player1);
            sessionStorage.setItem("player1score", 1);
        }else {
            let prevscore = x1score;
            sessionStorage.removeItem("player1name");
            sessionStorage.removeItem("player1score");
            sessionStorage.setItem("player1name", player1);
            sessionStorage.setItem("player1score", parseInt(prevscore) + 1);
        }
        startgame();
        return;
    } else if (rod2score.innerText == score) {
        resetBoard();
        rod1score.innerText = 0;
        rod2score.innerText = 0;
        alert(player2 + " wins!!");

        if (x2 == null) {
            sessionStorage.setItem("player2name", player2);
            sessionStorage.setItem("player2score", 1);
        } else {
            let prevscore = x2score;
            sessionStorage.removeItem("player2name");
            sessionStorage.removeItem("player2score");
            sessionStorage.setItem("player2name", player2);
            sessionStorage.setItem("player2score", parseInt(prevscore) + 1);
        }
        startgame();
        return;
    }
}