var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function (request, response) {
});
server.listen(1337, function () {
    console.log((new Date()) + " Server is listening on port 1337");
});

// create the server
wsServer = new WebSocketServer({
    httpServer: server
});

wsServer.on('request', function (request) {
    console.log((new Date()) + ' Connection from origin '
        + request.origin + '.');
    var connection = request.accept(null, request.origin);
    console.log((new Date()) + ' Connection accepted.');
    connection.on('message', function (message) {
        if (message.type === 'utf8') {
            console.log((new Date()) + ' Received Message from '
                + ': ' + message.utf8Data);
            connection.sendUTF("The mocker recieved your message");

        }
    });

    connection.on('close', function (connection) {
        console.log((new Date()) + " Peer "
            + connection.remoteAddress + " disconnected.");
    });
});
