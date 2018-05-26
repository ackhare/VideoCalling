package backendappserver

import enums.ConnectionStatus

class SessionInfo {

    String sessionId
    Date startTime = new Date()
    Date endTime
    Date updatedTime = new Date()
    ConnectionStatus connectionStatus
    String description


    static constraints = {
        endTime nullable: true
    }
}
