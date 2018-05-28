package com.nexthoughts.videoCallingBackend

import com.nexthoughts.videoCallingBackend.SessionInfo
import enums.ConnectionStatus
import grails.transaction.Transactional

@Transactional
class PingService {

    def serviceMethod() {
        Date currentTime = new Date()
        List<SessionInfo> sessionInfoList = SessionInfo.findAllByConnectionStatusNotEqual(ConnectionStatus.CLOSED)
        if (!sessionInfoList.empty) {
            SessionInfo sessionInfo = sessionInfoList?.last()?.refresh()
            long seconds = (currentTime.getTime() - sessionInfo.updatedTime.getTime()) / 1000
            if (seconds > 10) {
                sessionInfo.description = AppUtil.BACKEND_SERVER
                if (sessionInfo.connectionStatus != ConnectionStatus.CLOSED) {
                    sessionInfo.endTime = new Date();
                    sessionInfo.connectionStatus = ConnectionStatus.CLOSED
                    sessionInfo.save(flush: true, failOnError: true)
                }
            }
        }
    }
}

