package by.itechart.cargo.dto.notification.notification_data;

import by.itechart.cargo.dto.model_dto.user.UserResponse;
import by.itechart.cargo.model.Waybill;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WaybillNotificationData {
    private String invoiceNumber;
    private UserResponse driver;
    private UserResponse registrationUser;

    public static WaybillNotificationData fromWaybill(Waybill waybill) {
        return WaybillNotificationData.builder()
                .invoiceNumber(waybill.getInvoice().getNumber())
                .driver(UserResponse.toUserResponse(waybill.getInvoice().getDriver()))
                .registrationUser(UserResponse.toUserResponse(waybill.getInvoice().getCheckingUser())).build();
    }
}
