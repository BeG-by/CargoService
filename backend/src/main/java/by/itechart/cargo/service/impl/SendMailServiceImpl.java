package by.itechart.cargo.service.impl;

import by.itechart.cargo.model.User;
import by.itechart.cargo.repository.UserRepository;
import by.itechart.cargo.service.SendMailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@Slf4j
public class SendMailServiceImpl implements SendMailService {

    @Value("${spring.mail.username}")
    private String fromEmail;

    private final JavaMailSender javaMailSender;
    private final UserRepository userRepository;

    @Autowired
    public SendMailServiceImpl(JavaMailSender javaMailSender, UserRepository userRepository) {
        this.javaMailSender = javaMailSender;
        this.userRepository = userRepository;
    }

    @Override
    public void sendBirthdayMail() {
        LocalDate today = LocalDate.now();
        int month = today.getMonthValue();
        int day = today.getDayOfMonth();
        List<User> users = userRepository.findAllPresent();
        for (User user : users) {
            if (user.getBirthday().getMonthValue() == month
                    && user.getBirthday().getDayOfMonth() == day) {
                String to = user.getEmail();
                String subject = "Greeting";
                String text = "Happy Birthday, " + user.getName();
                sendMail(to, subject, text);
            }
        }
    }

    public void sendMail(String to, String subject, String text) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setTo(to);
        simpleMailMessage.setFrom(fromEmail);
        simpleMailMessage.setSubject(subject);
        simpleMailMessage.setText(text);
        try {
            javaMailSender.send(simpleMailMessage);
        } catch (Exception e) {
            log.error("Mail sending failed");
        }
    }

}
