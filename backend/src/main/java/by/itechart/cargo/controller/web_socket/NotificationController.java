package by.itechart.cargo.controller.web_socket;

import by.itechart.cargo.dto.model_dto.user.UserResponse;
import by.itechart.cargo.dto.notification.*;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.model.Invoice;
import by.itechart.cargo.model.Waybill;
import by.itechart.cargo.service.UserService;
import by.itechart.cargo.service.WaybillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class NotificationController {
    private static final String PRIVATE_ENDPOINT = "/queue/messages";
    private SimpMessagingTemplate messagingTemplate;
    private final UserService userService;
    private final WaybillService waybillService;

    @Autowired
    public NotificationController(SimpMessagingTemplate messagingTemplate, UserService userService, WaybillService waybillService) {
        this.messagingTemplate = messagingTemplate;
        this.userService = userService;
        this.waybillService = waybillService;
    }

    public void notifyAboutNewInvoice(Long invoiceId, Long notificationRecipient) {
        NewInvoiceNotification notification = new NewInvoiceNotification(invoiceId, notificationRecipient);
        messagingTemplate.convertAndSendToUser(String.valueOf(notificationRecipient), PRIVATE_ENDPOINT, notification);
    }

    public void notifyAboutInvoiceStatusChange(Long invoiceId, Invoice.Status invoiceStatus) throws NotFoundException {
        List<Long> recipientIds = new ArrayList<>();
        switch (invoiceStatus) {
            case REGISTERED:
                recipientIds.add(userService.findManagerByInvoiceId(invoiceId).getId());
                break;
            case REJECTED:
            case ACCEPTED:
                recipientIds.add(userService.findDispatcherByInvoiceId(invoiceId).getId());
                break;
            case CLOSED:
            case CLOSED_WITH_ACT:
                //notify manager
                break;
        }
        if (!recipientIds.isEmpty()) {
            for (Long recipientId : recipientIds) {
                InvoiceStatusUpdatedNotification notification = new InvoiceStatusUpdatedNotification(invoiceId, invoiceStatus, recipientId);
                messagingTemplate.convertAndSendToUser(String.valueOf(recipientId), PRIVATE_ENDPOINT, notification);
            }
        }
    }

    public void notifyAboutNewWaybill(Long waybillId, Long notificationRecipientId) {
        NewWaybillNotification notification = new NewWaybillNotification(notificationRecipientId, waybillId);
        messagingTemplate.convertAndSendToUser(String.valueOf(notificationRecipientId), PRIVATE_ENDPOINT, notification);
    }

    public void notifyAboutPointPass(Long pointId) throws NotFoundException {
        Waybill waybill = waybillService.findByPointId(pointId);
        UserResponse manager = userService.findManagerByInvoiceId(waybill.getInvoice().getId());
        PointPassNotification notification = new PointPassNotification(waybill.getId(), manager.getId());//todo: detached error
        messagingTemplate.convertAndSendToUser(String.valueOf(manager.getId()), PRIVATE_ENDPOINT, notification);
    }

    public void notifyAboutInvoiceUpdate(Long invoiceId) throws NotFoundException {
        Long managerId = userService.findManagerByInvoiceId(invoiceId).getId();
        InvoiceUpdateNotification notification = new InvoiceUpdateNotification(invoiceId, managerId);
        messagingTemplate.convertAndSendToUser(String.valueOf(managerId), PRIVATE_ENDPOINT, notification);
    }
}
