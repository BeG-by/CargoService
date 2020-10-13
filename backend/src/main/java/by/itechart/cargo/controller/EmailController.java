package by.itechart.cargo.controller;

import by.itechart.cargo.service.MailSenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("v1/api/email")
public class EmailController {

    private MailSenderService mailSenderService;

    @Autowired
    public EmailController(MailSenderService mailSenderService) {
        this.mailSenderService = mailSenderService;
    }


    @PostMapping
    public ResponseEntity<?> sendEmail() {

        return ResponseEntity.ok("Email has been send");
    }
}
