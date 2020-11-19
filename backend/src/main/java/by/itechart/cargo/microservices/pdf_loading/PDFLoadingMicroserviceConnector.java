package by.itechart.cargo.microservices.pdf_loading;

import by.itechart.cargo.microservices.MessagePublisher;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;

import java.util.Arrays;

public class PDFLoadingMicroserviceConnector implements MessageListener, MessagePublisher {
    private ChannelTopic topicForPDFLoadingRequests;
    private RedisTemplate<String, Object> redisTemplate;

    public void setTopicForPDFLoadingRequests(ChannelTopic topicForPDFLoadingRequests) {
        this.topicForPDFLoadingRequests = topicForPDFLoadingRequests;
    }

    public void setRedisTemplate(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    @Override
    public void publish(Long responseReceiverId, String urlToLoad) {
        System.out.println("Send message to microservice!");
        String messageBody = responseReceiverId + "_" + urlToLoad;
        redisTemplate.convertAndSend(topicForPDFLoadingRequests.getTopic(), messageBody);
    }

    @Override
    public void onMessage(Message message, byte[] bytes) {
        System.out.println("Receive message from microservice");
        System.out.println(Arrays.toString(message.getBody()));
        //todo: send via sockets
    }
}
