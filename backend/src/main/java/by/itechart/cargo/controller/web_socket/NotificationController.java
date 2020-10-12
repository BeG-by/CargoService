package by.itechart.cargo.controller.web_socket;

import by.itechart.cargo.dto.model_dto.invoice.InvoiceRequest;
import by.itechart.cargo.dto.model_dto.invoice.UpdateInvoiceStatusRequest;
import by.itechart.cargo.dto.model_dto.waybill.UpdatePointsRequest;
import by.itechart.cargo.dto.model_dto.waybill.WaybillRequest;
import by.itechart.cargo.dto.notification.NewInvoiceNotification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
public class NotificationController {
    private final String PRIVATE_ENDPOINT = "/queue/messages";
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    public NotificationController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public void notifyAboutNewInvoice(InvoiceRequest invoiceRequest) {
        NewInvoiceNotification notification = NewInvoiceNotification.fromInvoiceRequest(invoiceRequest);
        messagingTemplate.convertAndSendToUser(String.valueOf(invoiceRequest.getManagerId()), PRIVATE_ENDPOINT, notification);
    }

    public void notifyAboutInvoiceStatusChange(UpdateInvoiceStatusRequest updateInvoiceStatusRequest) {
    }

    public void notifyAboutNewWaybill(WaybillRequest waybillRequest) {

    }

    public void notifyAboutPointPass(UpdatePointsRequest updatePointsRequest) {

    }
}
