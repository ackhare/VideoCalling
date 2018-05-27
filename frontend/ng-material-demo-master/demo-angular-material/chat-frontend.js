$(function () {
    "use strict";
    // if user is running mozilla then use it's built-in WebSocket
    window.WebSocket = window.WebSocket || window.MozWebSocket;

    // if browser doesn't support WebSocket, just show some notification and exit
    if (!window.WebSocket) {
        content.html($('<p>', {
            text: 'Sorry, but your browser doesn\'t '
            + 'support WebSockets.'
        }));
        input.hide();
        $('span').hide();
        return;
    }

    // open connection
    var connection = new WebSocket('ws://127.0.0.1:1337');
    $("#sendMsg").click(function (e) {
        var message = $("#myMessage").val();
        connection.send(message);
        $("#myMessage").val("");
    });
    connection.onopen = function () {
        // first we want users to enter their names
        console.log("onOpen");

        $("#contentMain").append("<p>A mocker server has accepted your connection</p>");
        //sendToMainServer("open");
        angular.element(document.getElementById("mycontroller")).scope().sendToMainServer("open");

    };


    connection.onerror = function (error) {
        // just in there were some problems with conenction...
        console.log("onError");
        $("#contentMain").append($('<p>', {
            text: 'Sorry, but there\'s some problem with your '
            + 'connection or the server is down.'
        }));
    };
    connection.onclose = function (evt) {
        $("#contentMain").append("<p>A mocker server has closed your connection</p>");
        var url = evt.currentTarget.url
        if (url.includes(1337)) {
            console.log("closed");
                angular.element(document.getElementById("mycontroller")).scope().sendToMainServer("closed")
        }

        console.log("onclose.");
    };
    // most important part - incoming messages
    connection.onmessage = function (message) {
        // try to parse JSON message. Because we know that the server always returns
        // JSON this should work without any problem but we should make sure that
        // the massage is not chunked or otherwise damaged.
        var leng;
        if (event.data.size === undefined) {
            leng = event.data.length
        } else {
            leng = event.data.size
        }
        console.log("onmessage. size: " + leng + ", content: " + event.data);
        console.log(message);
        $("#contentMain").append("<p>A mocker server has accepted your message</p>");
    };


});