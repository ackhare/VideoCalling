package com.videoCallingbackend.chatroom

import enums.ResultStatus
import grails.converters.JSON
import grails.rest.RestfulController

class VideoCallController extends RestfulController {

    def sessionService

    static responseFormats = ['json', 'xml']

    def connect() {
        String sessionId = UUID.randomUUID().toString().replaceAll("-", "")
        String status = null
        if (sessionId) {
            status = sessionService.saveSessionInfo(sessionId)
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
//        println("ping session id ${params}")
        String sessionId = params.sessionid
//        println("ping ${sessionId}")
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
}
