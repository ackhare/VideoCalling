package com


class ServerCheckJob {

    def pingService

    static triggers = {
        simple repeatInterval: 10000l // execute job once in 10 seconds
    }

    def execute() {
        pingService.serviceMethod()
    }
}