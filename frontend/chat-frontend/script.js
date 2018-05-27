var app = angular.module('demoApp', ['ngMaterial']);
var url = 'http://localhost:8080/BackendAppServer/api/connection/connect';
var serverSessionId;
app.controller('abcd', function ($scope, $http, $timeout) {

    $scope.getSessionId = function (status) {
        var url = 'http://localhost:8080/BackendAppServer/api/connection/connect';

        console.log("status" + status)
        if (serverSessionId===undefined && status=="open") {
            $http({
                url: url,
                dataType: "JSON",
                method: "GET",
            }).then(function mySuccess(response) {
                console.log("session from main server");
                var mockerSessionId = response.data[0].sessionid;
                console.log(mockerSessionId);
                serverSessionId = mockerSessionId;
                $scope.sendToMainServer(status, mockerSessionId);
                $scope.intervalFunction(mockerSessionId);
            }, function myError(response) {
                // $scope.myWelcome = response.statusText;
            });
        }
        else if (status == "closed") {
            console.log(serverSessionId)
            $scope.sendToMainServer(status, serverSessionId);
        }

    }

    function sendSessionId(sessionID) {
        var url = 'http://localhost:8080/BackendAppServer/api/connection/ping';
        var data = ({sessionid: sessionID});
        $http.post(url, data).success(function (res) {
            console.log(res)
        }).error(function () {

        })
    }

    $scope.sendToMainServer = function (status, mockerSessionId) {
        var url = 'http://localhost:8080/BackendAppServer/api/connection/pingForExternalServer';
        var data = ({
            sessionid: mockerSessionId, identity: "mocker", status: status
        });
        $http.post(url, data).success(function (response) {
            console.log(response);

            //  mockerSessionId = response[0].sessionid
            console.log("In sendToMainServer");
            console.log(mockerSessionId)

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


