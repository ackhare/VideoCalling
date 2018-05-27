var app = angular.module('demoApp', ['ngMaterial']);
var url = 'http://localhost:8080/BackendAppServer/api/connection/connect';
var mockerSessionId;

app.controller('getSessionId', function ($scope, $http, $timeout) {
    var sc = $scope.sendSessionId;
    var url = 'http://localhost:8080/BackendAppServer/api/connection/connect';
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
        var data = ({sessionid: sessionID});
        $http.post(url, data).success(function (res) {
            console.log(res)
        }).error(function () {

        })
    }
    $scope.sendToMainServer = function (status) {
        var url = 'http://localhost:8080/BackendAppServer/api/connection/pingForExternalServer';
        var data = ({
            sessionid: mockerSessionId, identity: "mocker", status: status
        });
        $http.post(url, data).success(function (response) {
            console.log(response);

            mockerSessionId = response[0].sessionid
        })
            .error(function (data, status, header, config) {

            });

    }
    $scope.intervalFunction = function (sessionID) {
        $timeout(function () {
            sendSessionId(sessionID)
            $scope.intervalFunction(sessionID);
        }, 5000)
    };

});


