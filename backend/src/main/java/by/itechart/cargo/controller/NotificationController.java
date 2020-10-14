package by.itechart.cargo.controller;

import by.itechart.cargo.dto.model_dto.user.UserResponse;
import by.itechart.cargo.dto.notification.*;
import by.itechart.cargo.dto.notification.notification_data.InvoiceNotificationData;
import by.itechart.cargo.dto.notification.notification_data.PointNotificationData;
import by.itechart.cargo.dto.notification.notification_data.WaybillNotificationData;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.model.Invoice;
import by.itechart.cargo.model.Waybill;
import by.itechart.cargo.service.InvoiceService;
import by.itechart.cargo.service.PointService;
import by.itechart.cargo.service.UserService;
import by.itechart.cargo.service.WaybillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/v1/api/notifications")
@Validated
public class NotificationController {
    private static final String PRIVATE_ENDPOINT = "/queue/messages";
    private SimpMessagingTemplate messagingTemplate;
    private final UserService userService;
    private final WaybillService waybillService;
    private final InvoiceService invoiceService;
    private final PointService pointService;

    @Autowired
    public NotificationController(SimpMessagingTemplate messagingTemplate, UserService userService, WaybillService waybillService, InvoiceService invoiceService, PointService pointService) {
        this.messagingTemplate = messagingTemplate;
        this.userService = userService;
        this.waybillService = waybillService;
        this.invoiceService = invoiceService;
        this.pointService = pointService;
    }

    @GetMapping("/invoice/{id}")
    public ResponseEntity<InvoiceNotificationData> findInvoice(@PathVariable Long id) throws NotFoundException {
        return ResponseEntity.ok(invoiceService.findInvoiceNotificationData(id));
    }

    @GetMapping("/waybill/{id}")
    public ResponseEntity<WaybillNotificationData> findWaybill(@PathVariable Long id) throws NotFoundException {
        return ResponseEntity.ok(waybillService.findWaybillNotificationData(id));
    }

    @GetMapping("/point/{id}")
    public ResponseEntity<PointNotificationData> findPoint(@PathVariable Long id) throws NotFoundException {
        return ResponseEntity.ok(pointService.findPointNotificationData(id));
    }

    void notifyAboutNewInvoice(Long invoiceId, Long notificationRecipient) {
        NewInvoiceNotification notification = new NewInvoiceNotification(invoiceId, notificationRecipient);
        messagingTemplate.convertAndSendToUser(String.valueOf(notificationRecipient), PRIVATE_ENDPOINT, notification);
    }

    void notifyAboutInvoiceStatusChange(Long invoiceId, Invoice.Status invoiceStatus) throws NotFoundException {
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

    void notifyAboutNewWaybill(Long waybillId, Long notificationRecipientId) {
        NewWaybillNotification notification = new NewWaybillNotification(notificationRecipientId, waybillId);
        messagingTemplate.convertAndSendToUser(String.valueOf(notificationRecipientId), PRIVATE_ENDPOINT, notification);
    }

    void notifyAboutPointPass(Long pointId) throws NotFoundException {
        Waybill waybill = waybillService.findByPointId(pointId);
        UserResponse manager = userService.findManagerByInvoiceId(waybill.getInvoice().getId());
        PointPassNotification notification = new PointPassNotification(waybill.getId(), pointId, manager.getId());//todo: detached entity error? (discover why not)
        messagingTemplate.convertAndSendToUser(String.valueOf(manager.getId()), PRIVATE_ENDPOINT, notification);
    }

    void notifyAboutInvoiceUpdate(Long invoiceId) throws NotFoundException {
        Long managerId = userService.findManagerByInvoiceId(invoiceId).getId();
        InvoiceUpdateNotification notification = new InvoiceUpdateNotification(invoiceId, managerId);
        messagingTemplate.convertAndSendToUser(String.valueOf(managerId), PRIVATE_ENDPOINT, notification);
    }
}
