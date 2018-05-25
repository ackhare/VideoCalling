package enums

enum ResultStatus {

    OK("OK"),
    FAILED("FAILED")

    private String response
    ResultStatus(String response) {
        this.response = response
    }

    String getResponse() {
        return response
    }
}