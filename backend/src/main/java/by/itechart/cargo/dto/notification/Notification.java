package by.itechart.cargo.dto.notification;

public abstract class Notification {
    Type notificationType;
    Long notificationRecipientId;

    public Notification(Long notificationRecipientId, Type notificationType) {
        this.notificationRecipientId = notificationRecipientId;
        this.notificationType = notificationType;
    }

    public Long getNotificationRecipientId() {
        return notificationRecipientId;
    }

    public Type getNotificationType() {
        return notificationType;
    }

    enum Type {
        NEW_INVOICE,
        NEW_WAYBILL,
        INVOICE_STATUS_UPDATE,
        POINT_PASS,
        INVOICE_UPDATE,
        PDF_READY,
    }
}
