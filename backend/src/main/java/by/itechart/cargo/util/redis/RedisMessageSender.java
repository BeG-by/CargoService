package by.itechart.cargo.util.redis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

@Service
public class RedisMessageSender {

    private final RedisTemplate<String, String> redisTemplate;
    private final ChannelTopic topic;

    static final String MESSAGE_DELIMITER = ";___;___;";

    @Autowired
    public RedisMessageSender(RedisTemplate<String, String> redisTemplate, ChannelTopic topic) {
        this.redisTemplate = redisTemplate;
        this.topic = topic;
    }


    public void sendMail(String to, String subject, String text) {
        String messageString = String.join(MESSAGE_DELIMITER, to, subject, text);
        redisTemplate.convertAndSend(topic.getTopic(), messageString);

    }


}
