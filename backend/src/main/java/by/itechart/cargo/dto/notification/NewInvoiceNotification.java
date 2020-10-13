package by.itechart.cargo.dto.notification;

import by.itechart.cargo.dto.model_dto.invoice.InvoiceRequest;

public class NewInvoiceNotification extends Notification {
    private Long invoiceId;

    public NewInvoiceNotification(Long invoiceId, Long notificationRecipientId) {
        super(notificationRecipientId);
        this.invoiceId = invoiceId;
        this.notificationType = Type.NEW_INVOICE;
    }

    public Long getInvoiceId() {
        return invoiceId;
    }

    public void setInvoiceId(Long invoiceId) {
        this.invoiceId = invoiceId;
    }

    public static NewInvoiceNotification fromInvoiceRequest(InvoiceRequest invoiceRequest) {
        return new NewInvoiceNotification(invoiceRequest.getId(), invoiceRequest.getManagerId());
    }
}
