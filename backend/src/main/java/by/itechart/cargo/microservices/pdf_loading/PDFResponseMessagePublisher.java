package by.itechart.cargo.microservices.pdf_loading;

import by.itechart.cargo.microservices.MessagePublisher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Component;

@Component
public class PDFResponseMessagePublisher implements MessagePublisher {
    private RedisTemplate<String, Object> redisTemplate;
    private ChannelTopic channelTopic;

    @Autowired
    public PDFResponseMessagePublisher(RedisTemplate<String, Object> redisTemplate,
                                       @Qualifier("topicForPdfLoadingResponse") ChannelTopic channelTopic) {
        this.redisTemplate = redisTemplate;
        this.channelTopic = channelTopic;
    }

    @Override
    public void publish(Long responseReceiverId, String message) {
        redisTemplate.convertAndSend(channelTopic.getTopic(), message);
    }
}
