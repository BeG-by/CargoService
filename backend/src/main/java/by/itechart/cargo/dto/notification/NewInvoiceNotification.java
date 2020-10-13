package by.itechart.cargo.dto.notification;

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

}
