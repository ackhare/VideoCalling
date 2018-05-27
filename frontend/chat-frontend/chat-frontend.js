$(function () {
    "use strict";
    var statusFlag;
    const PORT_NUMBER = 1337;
    // if user is running mozilla then use it's built-in WebSocket
    window.WebSocket = window.WebSocket || window.MozWebSocket;
    // if browser doesn't support WebSocket, just show some notification and exit
    if (!window.WebSocket) {
        content.html($('<p>', {
            text: 'Sorry, but your browser doesn\'t '
            + 'support WebSockets.'
        }));
        return;
    }
    // open connection
    var connection = new WebSocket('ws://127.0.0.1:' + PORT_NUMBER);
    $("#sendMsg").click(function (e) {
        var message = $("#myMessage").val();
        connection.send(message);
        $("#myMessage").val("");
    });
    connection.onopen = function (evt) {
        console.log("onOpen");
        $("#contentMain").append("<p>A mocker server has accepted your connection</p>");
        var url = evt.currentTarget.url;
        if (url.includes(PORT_NUMBER)) {
            angular.element(document.getElementById("restController")).scope().getSessionId(OPEN_STATUS);
        }
    };


    connection.onerror = function (error) {
        console.log("onError");
        statusFlag = "error"
        $("#contentMain").append($('<p>', {
            text: 'Sorry, but there\'s some problem with your '
            + 'connection or the server is down.'
        }));
    };
    connection.onclose = function (evt) {
        $("#contentMain").append("<p>A mocker server has closed your connection</p>");
        var url = evt.currentTarget.url
        if (url.includes(PORT_NUMBER)) {
            console.log("closed");
            if (statusFlag !== ERROR)
                angular.element(document.getElementById("restController")).scope().getSessionId(CLOSED_STATUS)
        }

        console.log("onclose.");
    };
    connection.onmessage = function (message) {
        var leng;
        if (event.data.size === undefined) {
            leng = event.data.length
        } else {
            leng = event.data.size
        }
        console.log("onmessage. size: " + leng + ", content: " + event.data);
        $("#contentMain").append("<p>A mocker server has accepted your message</p>");
    };


});