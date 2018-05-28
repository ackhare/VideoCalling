package com.nexthoughts.videoCallingBackend

import com.nexthoughts.videoCallingBackend.SessionInfo
import enums.ConnectionStatus
import enums.ResultStatus
import grails.transaction.Transactional

@Transactional
class SessionService {

    public String saveSessionInfo(String sessionId, ConnectionStatus connectionStatus) {
        Date startTime = new Date()
        SessionInfo session = new SessionInfo(sessionId: sessionId, connectionStatus: connectionStatus)
        if (session.save(flush: true, failOnError: true)) {
            return ResultStatus.OK
        } else {
            return ResultStatus.FAILED
        }
    }

    public String updateSessionInfo(String sessionId, String identity, ConnectionStatus connectionStatus) {
        SessionInfo session = SessionInfo.findBySessionId(sessionId)
        String result = null
        if (session) {
            if (connectionStatus)
                session.connectionStatus = connectionStatus
            String currentSession = session.getConnectionStatus()
            if ((currentSession == ConnectionStatus.OPEN.toString()) || (currentSession == ConnectionStatus.ACTIVE.toString())) {
                session.connectionStatus = ConnectionStatus.ACTIVE
                session.updatedTime = new Date()
                if (session.save(flush: true, failOnError: true)) {
                    result = ResultStatus.OK
                } else {
                    result = ResultStatus.FAILED
                }

            } else if (session.connectionStatus == ConnectionStatus.CLOSED && identity == AppUtil.MOCK_SERVER) {
                session.endTime = new Date()
                session.updatedTime = new Date()
                if (session.save(flush: true, failOnError: true)) {
                    result = ResultStatus.OK
                } else {
                    result = ResultStatus.FAILED
                }
            } else {
                result = ResultStatus.FAILED
            }

        }
        return result
    }


}
