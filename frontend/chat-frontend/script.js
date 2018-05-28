var app = angular.module('videoCallingApp', ['ngMaterial']);
var serverSessionId;
app.controller('restController', function ($scope, $http, $timeout) {
    $scope.getSessionId = function (status) {
        if (serverSessionId === undefined && status === OPEN_STATUS) {
            $http({
                url: URL_FOR_GETTING_SESSIONID,
                dataType: "JSON",
                method: "GET",
            }).then(function mySuccess(response) {
                serverSessionId = response.data[0].sessionid;
                $scope.sendToMainServer(status, serverSessionId);
                $scope.intervalFunction(serverSessionId);
            }, function myError(response) {
            });
        }
        else if (status === CLOSED_STATUS) {
            $scope.sendToMainServer(status, serverSessionId);
        }

    }

    function sendSessionId(sessionID) {
        var data = ({sessionid: sessionID});
        $http.post(URL_FOR_PINGING_MAIN_SERVER, data).success(function (res) {
            console.log(res)
        }).error(function () {

        })
    }

    $scope.sendToMainServer = function (status, mockerSessionId) {
        var data = ({
            sessionid: mockerSessionId, identity: MOCK_SERVER, status: status
        });
        $http.post(URL_FOR_SENDING_MOCK_SESSIONID, data).success(function (response) {
            console.log("mock server running")
        }).error(function (data, status, header, config) {

        });

    }
    $scope.intervalFunction = function (sessionID) {
        $timeout(function () {
            sendSessionId(sessionID)
            $scope.intervalFunction(sessionID);
        }, 5000)
    };

});


