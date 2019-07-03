var tictactoeCases = document.getElementsByClassName("case");
var player = "O";

// Detect when a player click on a case
for (let i = 0; i < tictactoeCases.length; i++) {
    tictactoeCases[i].addEventListener("click", click);
}

document.getElementById("player").textContent = "It's up to player 1 to start";

// Add a round or a cross when player click
function click(e) {
    if (e.target.textContent === "") {
        if (player === "O") {
            e.target.textContent = "O";
            player = "X"
            document.getElementById("player").textContent = "It's up to player 2 to play";
        } else if (player === "X") {
            e.target.textContent = "X";
            player = "O";
            document.getElementById("player").textContent = "It's up to player 1 to play";
        }
    }
    checkWin();
}

// Check if a player won
function checkWin() {

    // Check if the first diagonal win
    let win = tictactoeCases[0].textContent+":"+tictactoeCases[4].textContent+":"+tictactoeCases[8].textContent;
    if (win === "O:O:O" || win === "X:X:X") {
        addWinPopup();
        return true;
    }

    // Check if the second diagonal win
    win = tictactoeCases[2].textContent+":"+tictactoeCases[4].textContent+":"+tictactoeCases[6].textContent;
    if (win === "O:O:O" || win === "X:X:X") {
        addWinPopup();
        return true;
    }

    // Check if lines win
    for (let i = 0; i < 7; i=i+3) {
        win = tictactoeCases[i].textContent+":"+tictactoeCases[i+1].textContent+":"+tictactoeCases[i+2].textContent;
        if (win === "O:O:O" || win === "X:X:X") {
            addWinPopup();
            return true;
        }
    }

    // Check if columns win
    for (let i = 0; i < 3; i++) {
        win = tictactoeCases[i].textContent+":"+tictactoeCases[i+3].textContent+":"+tictactoeCases[i+6].textContent;
        if (win === "O:O:O" || win === "X:X:X") {
            addWinPopup();
            return true;
        }
    }

    // Check equality
    if (tictactoeCases[0].textContent != "" && tictactoeCases[1].textContent != "" && tictactoeCases[2].textContent != "" && tictactoeCases[3].textContent != "" && tictactoeCases[4].textContent != "" && tictactoeCases[5].textContent != "" && tictactoeCases[6].textContent != "" && tictactoeCases[7].textContent != "" && tictactoeCases[8].textContent != "") {
        let popup = document.getElementById("equality-popup");
        popup.style.display = "block";
    }

}

function addWinPopup() {
    let popup = document.getElementById("win-popup");
    let winner = document.getElementById("winner");

    // Add the name of the winner
    if (player == "O") {
        winner.textContent = "2";
    } else if (player == "X") {
        winner.textContent = "1";
    }

    // Delete the event when player click
    for (let i = 0; i < tictactoeCases.length; i++) {
        tictactoeCases[i].removeEventListener("click", click);
    }

    popup.style.display = "block";
    console.log(popup)
}