package by.itechart.cargo.dto.notification;

public abstract class Notification {
    Type notificationType;
    Long notificationRecipientId;

    public Notification(Long notificationRecipientId) {
        this.notificationRecipientId = notificationRecipientId;
    }

    public Long getNotificationRecipientId() {
        return notificationRecipientId;
    }

    public void setNotificationRecipientId(Long notificationRecipientId) {
        this.notificationRecipientId = notificationRecipientId;
    }

    public void setNotificationType(Type notificationType) {
        this.notificationType = notificationType;
    }

    public Type getNotificationType() {
        return notificationType;
    }

    enum Type {
        NEW_INVOICE, NEW_WAYBILL, INVOICE_STATUS_UPDATED, POINT_PASSED,
    }

}
