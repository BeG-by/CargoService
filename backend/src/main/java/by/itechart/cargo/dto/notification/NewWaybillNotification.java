package by.itechart.cargo.dto.notification;

public class NewWaybillNotification extends Notification {
    private Long waybillId;

    public NewWaybillNotification(Long notificationRecipientId, Long waybillId) {
        super(notificationRecipientId, Type.NEW_WAYBILL);
        this.waybillId = waybillId;
    }

    public Long getWaybillId() {
        return waybillId;
    }
}
