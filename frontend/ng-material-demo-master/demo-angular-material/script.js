var app = angular.module('demoApp', ['ngMaterial']);
var url = 'http://localhost:8080/BackendAppServer/api/connection/connect';
app.controller('getSessionId', function ($scope, $http, $timeout) {
    var sc = $scope.sendSessionId;
    $http({
        url: url,
        dataType: "JSON",
        method: "GET",
    }).then(function mySuccess(response) {

        var serverSessionId = response.data[0].sessionid;
        $scope.intervalFunction(serverSessionId);
    }, function myError(response) {
        // $scope.myWelcome = response.statusText;
    });
    function sendSessionId(sessionID) {
        var url = 'http://localhost:8080/BackendAppServer/api/connection/ping';
        var data=({sessionid: sessionID});
        $http.post(url,data).
            success(function (res) {
                console.log(res)
            }).
            error(function () {

            })



    }

    $scope.intervalFunction = function (sessionID) {
        $timeout(function () {
            sendSessionId(sessionID)
            $scope.intervalFunction(sessionID);
        }, 5000)
    };

});


