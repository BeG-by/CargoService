package by.itechart.cargo.dto.notification;


public class PDFReadyNotification extends Notification {
    private String presignedURI;

    public PDFReadyNotification(Long notificationRecipientId, String presignedURI) {
        super(notificationRecipientId, Type.PDF_READY);
        this.presignedURI = presignedURI;
    }

    public String getPresignedURI() {
        return presignedURI;
    }
}
