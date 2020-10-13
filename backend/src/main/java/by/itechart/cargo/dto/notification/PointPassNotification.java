package by.itechart.cargo.dto.notification;

public class PointPassNotification extends Notification {
    private Long waybillId;

    public PointPassNotification(Long waybillId, Long notificationRecipientId) {
        super(notificationRecipientId, Type.POINT_PASS);
        this.waybillId = waybillId;
    }

    public Long getWaybillId() {
        return waybillId;
    }
}
