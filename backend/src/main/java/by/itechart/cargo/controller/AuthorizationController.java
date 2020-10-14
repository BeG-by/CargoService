package by.itechart.cargo.controller;


import by.itechart.cargo.dto.authorization_dto.AuthorizationRequest;
import by.itechart.cargo.dto.authorization_dto.AuthorizationResponse;
import by.itechart.cargo.dto.model_dto.user.UserSaveRequest;
import by.itechart.cargo.elasticsearch.ElasticsearchTestDataInserter;
import by.itechart.cargo.exception.AlreadyExistException;
import by.itechart.cargo.exception.IncorrectPasswordException;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.service.AuthorizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/v1/api/auth")
@Validated
public class AuthorizationController {

    private final AuthorizationService authorizationService;
    private final ElasticsearchTestDataInserter testDataInserter;

    @Autowired
    public AuthorizationController(AuthorizationService authorizationService, ElasticsearchTestDataInserter testDataInserter) {
        this.authorizationService = authorizationService;
        this.testDataInserter = testDataInserter;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthorizationResponse> login(@RequestBody @Valid AuthorizationRequest authorizationRequest) throws NotFoundException {
        testDataInserter.insertTestData();
        return ResponseEntity.ok(authorizationService.login(authorizationRequest));
    }

    @GetMapping("/logout")
    public ResponseEntity<String> logout() {
        authorizationService.logout();
        return ResponseEntity.ok("User has been logouted");
    }


    @PostMapping("/registration")
    public ResponseEntity<String> registration(@RequestBody @Valid UserSaveRequest request)
            throws AlreadyExistException, IncorrectPasswordException, NotFoundException {
        authorizationService.registration(request);
        return ResponseEntity.ok("Registration completed successfully");
    }

}
