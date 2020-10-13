package by.itechart.cargo.dto.notification;

public class InvoiceUpdateNotification extends Notification {
    private Long invoiceId;

    public InvoiceUpdateNotification(Long invoiceId, Long notificationRecipientId) {
        super(notificationRecipientId, Type.INVOICE_UPDATE);
        this.invoiceId = invoiceId;
    }

    public Long getInvoiceId() {
        return invoiceId;
    }
}
