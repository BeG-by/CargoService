package by.itechart.cargo.dto.notification;

public class NewWaybillNotification extends Notification {
    private Long waybillId;

    public NewWaybillNotification(Long notificationRecipientId, Long waybillId) {
        super(notificationRecipientId);
        this.waybillId = waybillId;
        this.notificationType = Type.NEW_WAYBILL;
    }

    public Long getWaybillId() {
        return waybillId;
    }
}
