package by.itechart.cargo.controller;

import by.itechart.cargo.util.RedisSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/redis")
public class RedisController {

    private final RedisSender sender;

    @Autowired
    public RedisController(RedisSender sender) {
        this.sender = sender;
    }

    @PostMapping
    public ResponseEntity<?> testRedis() {

        sender.sendMessageToRedis("Hello from controller");

        return ResponseEntity.ok("ok");
    }


}
