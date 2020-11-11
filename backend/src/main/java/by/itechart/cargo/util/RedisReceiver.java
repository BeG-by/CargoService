package by.itechart.cargo.util;


import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class RedisReceiver implements MessageListener {

    @Override
    public void onMessage(Message message, byte[] bytes) {
        log.info("Test message: " + message.toString());
    }

}
