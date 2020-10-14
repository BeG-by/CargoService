package by.itechart.cargo.service.impl;

import by.itechart.cargo.dto.model_dto.mail.MessageRequest;
import by.itechart.cargo.dto.model_dto.mail.MessageTemplateRequest;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.exception.ServiceException;
import by.itechart.cargo.model.User;
import by.itechart.cargo.repository.UserRepository;
import by.itechart.cargo.service.MailSenderService;
import by.itechart.cargo.service.util.TemplateUtil;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.internet.MimeMessage;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
public class MailSenderServiceImpl implements MailSenderService {

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Value("${link.registration}")
    private String registrationLink;

    @Value("${link.password}")
    private String passwordLink;

    private final JavaMailSender javaMailSender;
    private final UserRepository userRepository;
    private final TemplateUtil templateUtil;

    @Autowired
    public MailSenderServiceImpl(JavaMailSender javaMailSender, UserRepository userRepository, TemplateUtil templateUtil) {
        this.javaMailSender = javaMailSender;
        this.userRepository = userRepository;
        this.templateUtil = templateUtil;
    }

    @Override
    public void sendBirthdayMailJob() {
        LocalDate today = LocalDate.now();
        int month = today.getMonthValue();
        int day = today.getDayOfMonth();

        List<User> users = userRepository.findAllPresent();

        for (User user : users) {
            if (user.getBirthday().getMonthValue() == month
                    && user.getBirthday().getDayOfMonth() == day) {

                try {
                    final String content = templateUtil.getBirthdayTemplate(user);
                    String to = user.getEmail();
                    String subject = "Greeting";
                    sendMail(to, subject, content);
                } catch (ServiceException e) {
                    log.error(e.getMessage());
                }

            }
        }
    }


    @Override
    public void sendMail(String to, String subject, String text) throws ServiceException {

        try {
            final MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "UTF-8");

            helper.setTo(to);
            helper.setFrom(fromEmail);
            helper.setSubject(subject);
            helper.setText(text, true);

            javaMailSender.send(mimeMessage);
            log.info("Message has been sent to {} , subject is {}", to, subject);
        } catch (Exception e) {
            log.error("Mail sending failed", e);
            throw new ServiceException("Service for sending emails is temporary unavailable");
        }
    }

    @Override
    public void sendMail(MessageRequest request) throws ServiceException, NotFoundException {

        List<String> errors = new ArrayList<>();

        for (String email : request.getEmails()) {
            if (userRepository.findByEmail(email).isPresent()) {
                sendMail(email, request.getSubject(), request.getText());
            } else {
                errors.add(String.format("Email %s doesn't exist", email));
            }
        }

        if (!errors.isEmpty()) {
            throw new NotFoundException(String.join(",", errors));
        }

    }

    @Override
    public void sendMail(MessageTemplateRequest request) throws ServiceException, NotFoundException {

        List<String> errors = new ArrayList<>();

        for (String email : request.getEmails()) {
            final Optional<User> userDb = userRepository.findByEmail(email);

            if (userDb.isPresent()) {

                String content = "";
                switch (request.getType()) {
                    case "BIRTHDAY":
                        content = templateUtil.getBirthdayTemplate(userDb.get());
                        break;
                    case "BLOCKED":
                        content = templateUtil.getBlockedTemplate(userDb.get());
                        break;
                    default:
                        throw new NotFoundException("Template doesn't exist");
                }

                sendMail(email, request.getSubject(), content);

            } else {
                errors.add(String.format("Email %s doesn't exist", email));
            }

        }

        if (!errors.isEmpty()) {
            throw new NotFoundException(String.join(",", errors));
        }

    }

    @Override
    public String sendActivationMail(String to, String role) throws ServiceException {
        final String code = UUID.randomUUID().toString();
        final String link = registrationLink + "?code=" + code + "&role=" + role;
        final String subject = "Registration in the cargo system";

        final String content = templateUtil.getActivationTemplate(link);

        sendMail(to, subject, content);
        return code;
    }

    @Override
    public String sendResetPasswordMail(String to, User user) throws ServiceException {

        final String code = UUID.randomUUID().toString();
        final String link = passwordLink + "?code=" + code;
        final String subject = "Reset password in the cargo system";

        final String content = templateUtil.getPasswordTemplate(user, link);

        sendMail(to, subject, content);
        return code;
    }

}
