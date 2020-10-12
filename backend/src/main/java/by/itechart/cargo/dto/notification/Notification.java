package by.itechart.cargo.dto.notification;

public abstract class Notification {
    Type notificationType;

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
