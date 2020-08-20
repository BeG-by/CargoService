package by.itechart.cargo.controller;

import by.itechart.cargo.dto.authorization_dto.AuthorizationRequest;
import by.itechart.cargo.dto.authorization_dto.AuthorizationResponse;
import by.itechart.cargo.security.jwt.JwtTokenUtil;
import by.itechart.cargo.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;

// TEST

@RestController
@RequestMapping("/v1/api/users")
@CrossOrigin("*")
@Slf4j
public class UserController {

    private final UserService userService;
    private final JwtTokenUtil jwtTokenUtil;

    public UserController(UserService userService, JwtTokenUtil jwtTokenUtil) {
        this.userService = userService;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthorizationResponse> authenticate(@RequestBody AuthorizationRequest authorizationRequest) {
        return ResponseEntity.ok(new AuthorizationResponse(new HashSet<>(), 1 ,"token"));
    }

    @GetMapping("/test")
    public String test() {
        System.out.println(jwtTokenUtil.getJwtUser().getCompanyId());
        return "TEST";
    }

}
