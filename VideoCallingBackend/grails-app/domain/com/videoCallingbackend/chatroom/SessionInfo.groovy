package com.videoCallingbackend.chatroom

import enums.ConnectionStatus

class SessionInfo {

    String sessionId
    Date startTime = new Date()
    Date endTime
    Date updatedTime = new Date()
    ConnectionStatus connectionStatus

    static constraints = {
        endTime nullable: true
    }
}
