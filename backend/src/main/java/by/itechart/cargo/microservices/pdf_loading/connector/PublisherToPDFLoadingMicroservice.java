package by.itechart.cargo.microservices.pdf_loading.connector;

import by.itechart.cargo.microservices.MessagePublisher;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;


@Slf4j
public class PublisherToPDFLoadingMicroservice implements MessagePublisher {
    private ChannelTopic topicForPDFLoadingRequests;
    private RedisTemplate<String, Object> redisTemplate;

    public PublisherToPDFLoadingMicroservice(ChannelTopic topicForPDFLoadingRequests, RedisTemplate<String, Object> redisTemplate) {
        this.topicForPDFLoadingRequests = topicForPDFLoadingRequests;
        this.redisTemplate = redisTemplate;
    }

    @Override
    public void publish(Long responseReceiverId, String urlToLoad) {
        log.info("Send message for pdf loading microservice");
        String messageBody = responseReceiverId + "_" + urlToLoad;
        redisTemplate.convertAndSend(topicForPDFLoadingRequests.getTopic(), messageBody);
    }
}
