package com.nexthoughts.videoCallingBackend

import com.nexthoughts.videoCallingBackend.SessionInfo
import enums.ConnectionStatus
import grails.transaction.Transactional

@Transactional
class PingService {

    def serviceMethod() {
        Date currentTime = new Date()
        List<SessionInfo> sessionInfoList = SessionInfo.findAllByConnectionStatusNotEqual(ConnectionStatus.CLOSED)
        sessionInfoList.each { it ->
            long seconds = (currentTime.getTime() - it.updatedTime.getTime()) / 1000
            if (seconds > 10) {
                it.description = AppUtil.BACKEND_SERVER
                it.connectionStatus = ConnectionStatus.CLOSED
                it.save(flush: true, failOnError: true)
            }
        }
    }
}
