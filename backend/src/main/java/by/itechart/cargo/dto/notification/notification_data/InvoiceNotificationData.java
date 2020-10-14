package by.itechart.cargo.dto.notification.notification_data;

import by.itechart.cargo.dto.model_dto.user.UserResponse;
import by.itechart.cargo.model.Invoice;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InvoiceNotificationData {
    private String number;
    private UserResponse driver;
    private UserResponse checkingUser;
    private UserResponse registrationUser;
    private Invoice.Status status;

    public static InvoiceNotificationData fromInvoice(Invoice invoice) {
        return InvoiceNotificationData.builder()
                .number(invoice.getNumber())
                .checkingUser(UserResponse.toUserResponse(invoice.getCheckingUser()))
                .driver(UserResponse.toUserResponse(invoice.getDriver()))
                .registrationUser(UserResponse.toUserResponse(invoice.getRegistrationUser()))
                .status(invoice.getStatus()).build();
    }
}
