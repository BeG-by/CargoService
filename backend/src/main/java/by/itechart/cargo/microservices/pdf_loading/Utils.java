package by.itechart.cargo.microservices.pdf_loading;

import org.springframework.data.redis.connection.Message;

public class Utils {
    public static String parseURL(Message message) {
        String messageBody = message.toString();
        messageBody = messageBody.substring(7); //todo: check on len?

        String[] arr = messageBody.split("_", 2);
        return arr[1];
    }

    public static Long parseResponseReceiverId(Message message) {
        String messageBody = message.toString();
        messageBody = messageBody.substring(7); //todo: check on len?

        String[] arr = messageBody.split("_", 2);
        return Long.valueOf(arr[0]);
    }
}
