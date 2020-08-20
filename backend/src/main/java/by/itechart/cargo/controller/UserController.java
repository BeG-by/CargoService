package by.itechart.cargo.controller;

import by.itechart.cargo.dto.AuthorizationRequest;
import by.itechart.cargo.dto.AuthorizationResponse;
import by.itechart.cargo.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/api/users")
@CrossOrigin("*")
@Slf4j
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    @PostMapping("/authenticate")
    public ResponseEntity<AuthorizationResponse> authenticate(@RequestBody AuthorizationRequest authorizationRequest) {
        return ResponseEntity.ok(new AuthorizationResponse("ADMIN", 1 ,"token"));
    }

    @GetMapping("/test")
    public String test() {
        return "TEST";
    }

}
