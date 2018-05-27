import com.nexthoughts.videoCallingBackend.VideoCallController

class UrlMappings {

	static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }

        "/"(view:"/index")
        "/api/connection/connect"(controller: "videoCall",action: "connect")
        "/api/connection/close"(controller: "videoCall",action: "closed")
        "/api/connection/ping"(controller: "videoCall",action: "ping")
        "/api/connection/pingForExternalServer"(controller: "videoCall",action: "pingForExternalServer")


        "500"(view:'/error')
	}
}
