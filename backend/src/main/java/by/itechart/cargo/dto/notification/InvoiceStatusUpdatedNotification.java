package by.itechart.cargo.dto.notification;

import by.itechart.cargo.model.Invoice;

public class InvoiceStatusUpdatedNotification extends Notification {
    private Long invoiceId;
    private Invoice.Status newStatus;

    public InvoiceStatusUpdatedNotification(Long invoiceId, Invoice.Status newStatus, Long notificationRecipientId) {
        super(notificationRecipientId, Type.INVOICE_STATUS_UPDATE);
        this.invoiceId = invoiceId;
        this.newStatus = newStatus;
    }

    public Long getInvoiceId() {
        return invoiceId;
    }

    public Invoice.Status getNewStatus() {
        return newStatus;
    }
}
