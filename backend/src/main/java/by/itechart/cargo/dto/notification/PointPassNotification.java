package by.itechart.cargo.dto.notification;

public class PointPassNotification extends Notification {
    private Long waybillId;
    private Long pointId;

    public PointPassNotification(Long waybillId, Long pointId, Long notificationRecipientId) {
        super(notificationRecipientId, Type.POINT_PASS);
        this.waybillId = waybillId;
        this.pointId = pointId;
    }

    public Long getWaybillId() {
        return waybillId;
    }

    public Long getPointId() {
        return pointId;
    }
}
