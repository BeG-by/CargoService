package by.itechart.cargo.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

@Service
public class RedisSender {

    private final RedisTemplate<String, String> redisTemplate;
    private final ChannelTopic topic;

    @Autowired
    public RedisSender(RedisTemplate<String, String> redisTemplate, ChannelTopic topic) {
        this.redisTemplate = redisTemplate;
        this.topic = topic;
    }

    public void sendMessageToRedis(String text) {

        redisTemplate.convertAndSend(topic.getTopic(), text);

    }

}
