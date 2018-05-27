package com.nexthoughts.videoCallingBackend

import enums.ConnectionStatus
import enums.ResultStatus
import grails.converters.JSON
import grails.rest.RestfulController

class VideoCallController extends RestfulController {

    def sessionService


    static responseFormats = ['json', 'xml']

    def connect() {
        String sessionId = AppUtil.generateRandomId()
        String status = null
        if (sessionId) {
            status = sessionService.saveSessionInfo(sessionId, AppUtil.BACKEND_SERVER, ConnectionStatus.OPEN)
        } else {
            status = ResultStatus.FAILED
        }
        def result = []
        result.add("sessionid": sessionId)
        render result as JSON
    }


    def ping() {
        def requestJSON = request.getJSON()
        String sessionId = requestJSON["sessionid"]
        String status = null
        if (sessionId) {
            status = sessionService.updateSessionInfo(sessionId, AppUtil.BACKEND_SERVER, null)
        } else {
            status = ResultStatus.FAILED
        }
        def result = []
        result.add("status": status)
        render result as JSON
    }

    def pingForExternalServer() {
        def requestJSON = request.getJSON()
        String status = null
        String identity = requestJSON["identity"]
        String statusOfCall = requestJSON["status"]
        String sessionId = requestJSON['sessionid']
        if (sessionId) {
            if (statusOfCall == ConnectionStatus.OPEN.status.toLowerCase()) {
                status = sessionService.updateSessionInfo(sessionId, identity, ConnectionStatus.OPEN)
            } else if (statusOfCall == ConnectionStatus.CLOSED.status.toLowerCase()) {
                status = sessionService.updateSessionInfo(sessionId, identity, ConnectionStatus.CLOSED)
            }

        } else {
            status = ResultStatus.FAILED
        }
        def result = []
        result.add("status": status)
        render result as JSON
    }
}
