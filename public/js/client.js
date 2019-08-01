var socket = io.connect("localhost:8080");
var tictactoeCases = document.getElementsByClassName("case");
var player = "O";
var joueur;

document.getElementById("player").textContent = "Waiting for an other player...";

// Connect the client
socket.on('connection', clientName => {
    client = clientName;
    if (clientName == "player2") {
        document.getElementById("p2").textContent = "(you)";
    } else {
        document.getElementById("p1").textContent = "(you)";
    }
});

// Change the player paragraph when both players are connected
socket.on('setReady',() => {
    document.getElementById("player").textContent = "It's up to player 1 to start";
});

// Detect when a player click on a case
for (let i = 0; i < tictactoeCases.length; i++) {
    tictactoeCases[i].addEventListener("click", click);
}

// Add a round or a cross when player click
function click(e) {
    if (e.target.textContent === "") {
        if (player === "O" && client === "player1") {
            socket.emit('addSign', { type: "O", id: e.target.id, player: "X" });
        } else if (player === "X" && client === "player2") {
            socket.emit('addSign', { type: "X", id: e.target.id, player: "O" });
        }
    }
}

// Display the sign into the client table
socket.on('displaySign', data => {
    document.getElementById(data.id).textContent = data.type;
    checkWin();
    player = data.player;
    if (player == "O") {
        document.getElementById("player").textContent = "It's up to player 1 to play";
    } else if (player == "X") {
        document.getElementById("player").textContent = "It's up to player 2 to play";
    }
});

// Check if a player won
function checkWin() {

    // Check if the first diagonal win
    let win = tictactoeCases[0].textContent+":"+tictactoeCases[4].textContent+":"+tictactoeCases[8].textContent;
    if (win === "O:O:O" || win === "X:X:X") {
        socket.emit('endGame', player);
        return true;
    }

    // Check if the second diagonal win
    win = tictactoeCases[2].textContent+":"+tictactoeCases[4].textContent+":"+tictactoeCases[6].textContent;
    if (win === "O:O:O" || win === "X:X:X") {
        socket.emit('endGame', player);
        return true;
    }

    // Check if lines win
    for (let i = 0; i < 7; i=i+3) {
        win = tictactoeCases[i].textContent+":"+tictactoeCases[i+1].textContent+":"+tictactoeCases[i+2].textContent;
        if (win === "O:O:O" || win === "X:X:X") {
            socket.emit('endGame', player);
            return true;
        }
    }

    // Check if columns win
    for (let i = 0; i < 3; i++) {
        win = tictactoeCases[i].textContent+":"+tictactoeCases[i+3].textContent+":"+tictactoeCases[i+6].textContent;
        if (win === "O:O:O" || win === "X:X:X") {
            socket.emit('endGame', player);
            return true;
        }
    }

    // Check equality
    if (tictactoeCases[0].textContent != "" && tictactoeCases[1].textContent != "" && tictactoeCases[2].textContent != "" && tictactoeCases[3].textContent != "" && tictactoeCases[4].textContent != "" && tictactoeCases[5].textContent != "" && tictactoeCases[6].textContent != "" && tictactoeCases[7].textContent != "" && tictactoeCases[8].textContent != "") {
        socket.emit('endGame', 'equality');
    }

}

// Add the good popup to the client
socket.on('addPopup', player => {
    if (client == player && player != "equality") {
        addWinPopup();
    } else if (client != player && player != "equality" ){
        addLoosePopup();
    } else if (player == "equality") {
        addEqualityPopup();
    }
});

function addWinPopup() {
    // Delete the event when player click
    for (let i = 0; i < tictactoeCases.length; i++) {
        tictactoeCases[i].removeEventListener("click", click);
    }

    let popup = document.getElementById("win-popup");
    popup.style.display = "block";
};

function addLoosePopup() {
    // Delete the event when player click
    for (let i = 0; i < tictactoeCases.length; i++) {
        tictactoeCases[i].removeEventListener("click", click);
    }

    let popup = document.getElementById("loose-popup");
    popup.style.display = "block";
};

function addEqualityPopup() {
    // Delete the event when player click
    for (let i = 0; i < tictactoeCases.length; i++) {
        tictactoeCases[i].removeEventListener("click", click);
    }

    let popup = document.getElementById("equality-popup");
    popup.style.display = "block";
};

// Detect if the player click on play again
for (let i = 0; i < document.getElementsByClassName('play-again').length; i++) {
    document.getElementsByClassName('play-again')[i].addEventListener("click", (e) => {
        socket.emit('replay');
    });
}

socket.on('addReplayPopup', () => {
    document.getElementById('win-popup').style.display = "none";
    document.getElementById('loose-popup').style.display = "none";
    document.getElementById('equality-popup').style.display = "none";
    document.getElementById('replay-popup').style.display = "block";
});