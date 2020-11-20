package by.itechart.cargo.microservices.message_broker;

import by.itechart.cargo.microservices.MailPublisher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

@Service
public class MailPublisherImpl implements MailPublisher {

    private final RedisTemplate<String, String> redisTemplate;
    private final ChannelTopic topic;

    static final String MESSAGE_DELIMITER = ";___;___;";

    @Autowired
    public MailPublisherImpl(RedisTemplate<String, String> redisTemplate, @Qualifier("topicForEmail") ChannelTopic topic) {
        this.redisTemplate = redisTemplate;
        this.topic = topic;
    }

    @Override
    public void publishMail(String to, String subject, String text) {
        String messageString = String.join(MESSAGE_DELIMITER, to, subject, text);
        redisTemplate.convertAndSend(topic.getTopic(), messageString);

    }


}
