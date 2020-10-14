package by.itechart.cargo.dto.notification.notification_data;

import by.itechart.cargo.dto.model_dto.user.UserResponse;
import by.itechart.cargo.model.Point;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PointNotificationData {
    private LocalDateTime passTime;
    private UserResponse driver;

    public static PointNotificationData fromPoint(Point point) {
        return PointNotificationData.builder()
                .driver(UserResponse.toUserResponse(point.getWaybill().getInvoice().getDriver())) //we will get half of DB
                .passTime(point.getPassageDate()).build();
    }
}
