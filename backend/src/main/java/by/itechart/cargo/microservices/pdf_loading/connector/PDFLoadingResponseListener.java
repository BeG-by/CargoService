package by.itechart.cargo.microservices.pdf_loading.connector;

import by.itechart.cargo.controller.NotificationController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.stereotype.Component;

import static by.itechart.cargo.microservices.pdf_loading.Utils.parseResponseReceiverId;
import static by.itechart.cargo.microservices.pdf_loading.Utils.parseURL;

@Component
public class PDFLoadingResponseListener implements MessageListener {
    private final NotificationController notificationController;

    @Autowired
    public PDFLoadingResponseListener(NotificationController notificationController) {
        this.notificationController = notificationController;
    }


    @Override
    public void onMessage(Message message, byte[] bytes) {
        Long responseReceiverId = parseResponseReceiverId(message);
        String url = parseURL(message);
        notificationController.notifyAboutPDFSuccessLoading(url, responseReceiverId);
    }
}
