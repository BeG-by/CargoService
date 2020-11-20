package by.itechart.cargo.microservices;

public interface MessagePublisher {
    void publish(Long responseReceiver, String message);
}
