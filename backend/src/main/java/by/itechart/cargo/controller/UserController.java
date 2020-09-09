package by.itechart.cargo.controller;

import by.itechart.cargo.dto.model_dto.UserRequest;
import by.itechart.cargo.model.User;
import by.itechart.cargo.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/v1/api/users")
@Slf4j
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> findAll() {
        return userService.findAll();
    }

    @PostMapping
    public ResponseEntity<String> saveOne(@RequestBody UserRequest userRequest) {
        userService.saveOne(userRequest);
        return ResponseEntity.ok("User has been saved");
    }


}
