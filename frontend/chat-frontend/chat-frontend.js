$(function () {
    "use strict";
    var statusFlag;
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
    connection.onopen = function (evt) {
        console.log("onOpen");
        $("#contentMain").append("<p>A mocker server has accepted your connection</p>");
        var url = evt.currentTarget.url;
        console.log(url);
        if (url.includes(1337)) {
            angular.element(document.getElementById("mycontroller")).scope().getSessionId("open");
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
        if (url.includes(1337)) {
            console.log("closed");
            if (statusFlag !== "error")
                angular.element(document.getElementById("mycontroller")).scope().getSessionId("closed")
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