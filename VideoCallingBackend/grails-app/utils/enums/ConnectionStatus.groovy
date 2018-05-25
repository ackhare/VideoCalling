package enums

public enum ConnectionStatus {
    OPEN('OPEN'),
    CLOSED ('CLOSED'),
    ACTIVE ('ACTIVE')

    private String status;

    public ConnectionStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status
    }
}