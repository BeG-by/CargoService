package by.itechart.cargo.controller;

import by.itechart.cargo.service.SendMailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("v1/api/email")
public class EmailController {

    private SendMailService sendMailService;

    @Autowired
    public EmailController(SendMailService sendMailService) {
        this.sendMailService = sendMailService;
    }


    @PostMapping
    public ResponseEntity<?> sendEmail() {

        return ResponseEntity.ok("Email has been send");
    }
}
