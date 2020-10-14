package by.itechart.cargo.controller;

import by.itechart.cargo.dto.model_dto.mail.MessageRequest;
import by.itechart.cargo.dto.model_dto.mail.MessageTemplateRequest;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.exception.ServiceException;
import by.itechart.cargo.service.MailSenderService;
import by.itechart.cargo.service.util.TemplateUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static by.itechart.cargo.security.RoleConstant.ADMIN;
import static by.itechart.cargo.security.RoleConstant.OWNER;

@RestController
@RequestMapping("v1/api/emails")
@Validated
public class EmailController {

    private MailSenderService mailSenderService;
    private TemplateUtil templateUtil;

    @Autowired
    public EmailController(MailSenderService mailSenderService, TemplateUtil templateUtil) {
        this.mailSenderService = mailSenderService;
        this.templateUtil = templateUtil;
    }

    @PostMapping
    @Secured({ADMIN, OWNER})
    public ResponseEntity<?> sendEmail(@Valid @RequestBody MessageRequest request) throws NotFoundException, ServiceException {
        mailSenderService.sendMail(request);
        return ResponseEntity.ok("Emails has been sent");
    }

    @PostMapping("/template")
    @Secured({ADMIN, OWNER})
    public ResponseEntity<?> sendTemplateEmail(@Valid @RequestBody MessageTemplateRequest request) throws NotFoundException, ServiceException {
        mailSenderService.sendMail(request);
        return ResponseEntity.ok("Emails has been sent");
    }


    @GetMapping("/templates")
    @Secured({ADMIN, OWNER})
    public ResponseEntity<?> getTemplatesContent() throws ServiceException {
        return ResponseEntity.ok(templateUtil.getAllContent());
    }

}
