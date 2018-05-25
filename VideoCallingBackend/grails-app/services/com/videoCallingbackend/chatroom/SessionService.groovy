package com.videoCallingbackend.chatroom

import enums.ConnectionStatus
import enums.ResultStatus
import grails.transaction.Transactional
import com.videoCallingbackend.chatroom.SessionInfo

@Transactional
class SessionService {

    public String saveSessionInfo(String sessionId) {
        //Date startTime = new Date()
        SessionInfo session = new SessionInfo(sessionId: sessionId, connectionStatus: ConnectionStatus.OPEN)
        session.validate()
        println session.errors
        session.save(flush: true, failOnError: true)
//        if (session.save(flush: true, failOnError: true)) {
//            return ResultStatus.OK
//        } else {
//            return ResultStatus.FAILED
//        }
    }

    public String closeSession(String sessionId) {
        //SessionInfo session = SessionInfo.findBySessionId(sessionId)
        SessionInfo session =new  SessionInfo()
        session.sessionId=sessionId
        session.connectionStatus = ConnectionStatus.CLOSED
        session.endTime = new Date();
        session.validate()
        println session.errors
        session.save(flush: true, failOnError: true)
//        String currentSession = session.getConnectionStatus()
//        if (currentSession != ConnectionStatus.CLOSED.toString()) {
//            session.endTime = new Date()
//            session.connectionStatus = ConnectionStatus.CLOSED
//            if (session.save()) {
//                result = ResultStatus.OK
//            } else {
//                result = ResultStatus.FAILED
//            }
//        } else {
//            result = ResultStatus.FAILED
//        }
    }

    public String updateSessionInfo(String sessionId) {
        SessionInfo session = SessionInfo.findBySessionId(sessionId)
        String result = null
        String currentSession = session.getConnectionStatus()
        if ((currentSession == ConnectionStatus.OPEN.toString()) || (currentSession == ConnectionStatus.ACTIVE.toString())) {
            session.connectionStatus = ConnectionStatus.ACTIVE
            session.updatedTime = new Date()
            if (session.save(flush: true, failOnError: true)) {
                result = ResultStatus.OK
            } else {
                result = ResultStatus.FAILED
            }
        } else {
            result = ResultStatus.FAILED
        }
        return result
    }
}
