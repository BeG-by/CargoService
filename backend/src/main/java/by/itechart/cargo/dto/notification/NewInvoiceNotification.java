package by.itechart.cargo.dto.notification;

import by.itechart.cargo.dto.model_dto.invoice.InvoiceRequest;

public class NewInvoiceNotification extends Notification {
    private Long invoiceId;
    private Long checkingUserId;

    public NewInvoiceNotification(Long invoiceId, Long checkingUserId) {
        this.invoiceId = invoiceId;
        this.checkingUserId = checkingUserId;
        this.notificationType = Type.NEW_INVOICE;
    }

    public Long getInvoiceId() {
        return invoiceId;
    }

    public void setInvoiceId(Long invoiceId) {
        this.invoiceId = invoiceId;
    }

    public Long getCheckingUserId() {
        return checkingUserId;
    }

    public void setCheckingUserId(Long checkingUserId) {
        this.checkingUserId = checkingUserId;
    }

    public static NewInvoiceNotification fromInvoiceRequest(InvoiceRequest invoiceRequest) {
        return new NewInvoiceNotification(invoiceRequest.getId(), invoiceRequest.getManagerId());
    }
}
