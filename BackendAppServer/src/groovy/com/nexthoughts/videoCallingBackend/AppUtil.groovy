package com.nexthoughts.videoCallingBackend

/**
 * Created by chetan on 27/5/18.
 */
class AppUtil {

    static final String   generateRandomId()
    {
        UUID.randomUUID().toString().replaceAll("-", "")
    }
}