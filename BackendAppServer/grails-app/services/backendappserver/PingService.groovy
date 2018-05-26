package backendappserver

import enums.ConnectionStatus
import grails.transaction.Transactional

@Transactional
class PingService {

    def serviceMethod() {
        Date currentTime = new Date()
        List<SessionInfo> sessionInfoList = SessionInfo.findAllByConnectionStatusNotEqual(ConnectionStatus.CLOSED)
        sessionInfoList.each { it ->
            long seconds = (currentTime.getTime() - it.updatedTime.getTime()) / 1000
//            println("time difference for session ${it.sessionId} is ${seconds}")
            if (seconds > 10) {
                it.connectionStatus = ConnectionStatus.CLOSED
                it.save(flush: true, failOnError: true)
            }
        }
    }
}
