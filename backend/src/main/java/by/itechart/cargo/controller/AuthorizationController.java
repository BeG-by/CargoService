package by.itechart.cargo.controller;


import by.itechart.cargo.dto.authorization_dto.*;
import by.itechart.cargo.dto.model_dto.user.UserSaveRequest;
import by.itechart.cargo.elasticsearch.ElasticsearchTestDataInserter;
import by.itechart.cargo.exception.*;
import by.itechart.cargo.service.AuthorizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;

@RestController
@RequestMapping("/v1/api/auth")
@Validated
public class AuthorizationController {

    private final AuthorizationService authorizationService;
    private final ElasticsearchTestDataInserter testDataInserter;

    @Value("${auth2.jwt.redirect-uri}")
    private String jwtRedirectURI;

    @Value("${auth2.denied.redirect-uri}")
    private String deniedRedirectURI;

    @Autowired
    public AuthorizationController(AuthorizationService authorizationService, ElasticsearchTestDataInserter testDataInserter) {
        this.authorizationService = authorizationService;
        this.testDataInserter = testDataInserter;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthorizationResponse> login(@RequestBody @Valid AuthorizationRequest authorizationRequest) throws NotFoundException {
//        testDataInserter.insertTestData();
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

    @PostMapping("/mail")
    public ResponseEntity<String> resetPasswordMail(@RequestBody @Valid ResetPasswordMail request)
            throws NotFoundException, ServiceException, AlreadyExistException {
        authorizationService.resetPassword(request.getEmail());
        return ResponseEntity.ok("Instructions have been sent to email " + request.getEmail());
    }

    @PostMapping("/password")
    public ResponseEntity<String> resetPassword(@RequestBody @Valid ResetPasswordRequest request)
            throws NotFoundException, IncorrectPasswordException {
        authorizationService.resetPassword(request);
        return ResponseEntity.ok("Password has been change");
    }

    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(@RequestBody @Valid Oauth2Request request)
            throws NotFoundException, EmailsNotMatchException {
        return ResponseEntity.ok(authorizationService.oauth2GoogleLogin(request));
    }

    @GetMapping("/code")
    public void githubLogin(@RequestParam("code") String authCode, HttpServletResponse res) throws IOException {

        try {
            String token = authorizationService.oauth2GitHubLogin(authCode);
            res.sendRedirect(jwtRedirectURI + "?token=" + token);
        } catch (NotFoundException e) {
            res.sendRedirect(deniedRedirectURI);
        }

    }

}
