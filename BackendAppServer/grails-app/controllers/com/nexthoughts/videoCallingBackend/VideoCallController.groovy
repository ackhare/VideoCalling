package com.nexthoughts.videoCallingBackend

import enums.ConnectionStatus
import enums.ResultStatus
import grails.converters.JSON
import grails.rest.RestfulController

class VideoCallController extends RestfulController {

    def sessionService
    private static final String BACKEND_SERVER="backend server"

    static responseFormats = ['json', 'xml']

    def connect() {
        String sessionId = UUID.randomUUID().toString().replaceAll("-", "")
        String status = null
        if (sessionId) {
            status = sessionService.saveSessionInfo(sessionId, BACKEND_SERVER, ConnectionStatus.OPEN)
        } else {
            status = ResultStatus.FAILED
        }
        def result = []
        result.add("sessionid": sessionId)
        render result as JSON
    }

    def closed() {
        def requestJSON = request.getJSON()
        String sessionId = requestJSON['sessionid']
        String status = null
        if (sessionId) {
            status = sessionService.closeSession(sessionId)
        } else {
            status = ResultStatus.FAILED
        }
        def result = []
        result.add("status": status)
        render result as JSON
    }

    def ping() {
        String sessionId = params.sessionid
        String status = null
        if (sessionId) {
            status = sessionService.updateSessionInfo(sessionId)
        } else {
            status = ResultStatus.FAILED
        }
        def result = []
        result.add("status": status)
        render result as JSON
    }

    def pingForExternalServer() {
        def requestJSON = request.getJSON()
        String identity = requestJSON["identity"]
        String status = requestJSON["status"]
        String sessionId = null
        if (status == ConnectionStatus.OPEN.status.toLowerCase()) {
            sessionService.saveSessionInfo(AppUtil.generateRandomId(), identity, ConnectionStatus.OPEN)
        } else if (status == ConnectionStatus.CLOSED.status.toLowerCase()) {
            sessionService.updateSessionInfo(requestJSON['sessionid'] as String)
        }
        def result = []
        result.add("sessionId": sessionId)
        render result as JSON
    }
}
