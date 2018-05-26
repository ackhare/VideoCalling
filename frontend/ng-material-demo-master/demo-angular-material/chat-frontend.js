$(function () {
    "use strict";

    // for better performance - to avoid searching in DOM
    var content = $('#content');
    var input = $('#input');
    var status = $('#status');

    // my color assigned by the server
    var myColor = false;
    // my name sent to the server
    var myName = false;

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

        $("#contentMain").append("<p>A mocker server has just entered</p>");
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
        var url = evt.currentTarget.url
        if (url.includes("mocker")) {

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
        connection.send(message);
    };


});