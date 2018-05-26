var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function (request, response) {
    // process HTTP request. Since we're writing just WebSockets
    // server we don't have to implement anything.
});
server.listen(1337, function () {
    console.log((new Date()) + " Server is listening on port 1337");
});

// create the server
wsServer = new WebSocketServer({
    httpServer: server
});

// WebSocket// This callback function is called every time someone
// tries to connect to the WebSocket server server
wsServer.on('request', function (request) {
    console.log((new Date()) + ' Connection from origin '
        + request.origin + '.');
    var connection = request.accept(null, request.origin);
    console.log((new Date()) + ' Connection accepted.');
    // This is the most important callback for us, we'll handle
    // all messages from users here.
    connection.on('message', function (message) {
        if (message.type === 'utf8') {
            // process WebSocket message
            console.log((new Date()) + ' Received Message from '
                + ': ' + message.utf8Data);
            connection.sendUTF("The mocker recieved your message");
            // console.log((new Date()) +);
        }
    });

    connection.on('close', function (connection) {
        // close user connection
        console.log((new Date()) + " Peer "
            + connection.remoteAddress + " disconnected.");
    });
});
