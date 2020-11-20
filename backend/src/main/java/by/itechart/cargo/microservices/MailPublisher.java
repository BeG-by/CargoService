package by.itechart.cargo.microservices;

public interface MailPublisher {

    void publishMail(String to, String subject, String text);

}
