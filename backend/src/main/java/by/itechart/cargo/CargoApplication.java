package by.itechart.cargo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import redis.embedded.RedisServer;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class CargoApplication {
    private RedisServer redisServer;

    @PostConstruct
    public void init() {
        redisServer = new RedisServer();
        redisServer.start();
    }

    public static void main(String[] args) {
        SpringApplication.run(CargoApplication.class, args);
    }

    @PreDestroy
    public void destroy() {
        redisServer.stop();
    }

}
