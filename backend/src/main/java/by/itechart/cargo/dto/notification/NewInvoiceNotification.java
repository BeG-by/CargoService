package by.itechart.cargo.dto.notification;

public class NewInvoiceNotification extends Notification {
    private Long invoiceId;

    public NewInvoiceNotification(Long invoiceId, Long notificationRecipientId) {
        super(notificationRecipientId, Type.NEW_INVOICE);
        this.invoiceId = invoiceId;
    }

    public Long getInvoiceId() {
        return invoiceId;
    }

}
