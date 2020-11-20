package by.itechart.cargo.microservices.message_broker;


import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.internet.MimeMessage;

@Service
@Slf4j
public class MailListener implements MessageListener {


    @Value("${spring.mail.username}")
    private String fromEmail;
    private final JavaMailSender javaMailSender;

    @Autowired
    public MailListener(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    @SneakyThrows
    @Override
    public void onMessage(Message message, byte[] bytes) {

        try {

            String[] params = message.toString().split(MailPublisherImpl.MESSAGE_DELIMITER);

            String to = params[0];
            String subject = params[1];
            String text = params[2];

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

        }

    }

}
