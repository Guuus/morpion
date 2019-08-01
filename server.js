const http = require('http');

// Create a http server
var app = http.createServer((req, res) => {
    res.writeHead(200, {"Content-Type":"text/html"});
    res.end();
});

app.listen(8080, () => {
    console.log('Server running on port 8080');
});

const io = require('socket.io').listen(app);

var players = [];

// Detect connection to socket.io
io.sockets.on('connection', socket => {

    // Add the player into the array after the connexion
    if (players.length == 0) {
        players.push("player1");
        socket.emit("connection", "player1");
    } else if (players.length == 1 && players[0] != "player2") {
        players.push("player2");
        socket.emit("connection", "player2");
        io.emit("setReady");
    } else {
        players.unshift("player1");
        socket.emit("connection", "player1");
        io.emit("setReady");
    }

    // Display the sign into all the client tables when a click is detected
    socket.on('addSign', data => {
        if (players.length >= 2) {
            io.emit("displaySign", { type: data.type, id: data.id, player: data.player });
        }
    });

    // Send a popup to inform the player that he won/lost/equalizes
    socket.on('endGame', (player) => {
        if (player == "O") {
            socket.emit("addPopup", "player1");
        } else if (player == "X") {
            socket.emit("addPopup", "player2");
        } else if (player == "equality") {
            socket.emit("addPopup", "equality");
        }
    });

    // Send the replay request to the other player
    socket.on('replay', () => {
        socket.broadcast.emit("addReplayPopup");
    });

    // Delete the player of the array when he disconnects
    socket.on('clientDisconnect', (client) => {
        players.splice(players.indexOf(client), 1);
    });

});