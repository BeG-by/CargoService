package by.itechart.cargo.service.impl;

import by.itechart.cargo.exception.ServiceException;
import by.itechart.cargo.model.User;
import by.itechart.cargo.repository.UserRepository;
import by.itechart.cargo.service.SendMailService;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import javax.mail.internet.MimeMessage;
import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class SendMailServiceImpl implements SendMailService {

    @Value("${spring.mail.username}")
    private String fromEmail;

    private final static String TEMPLATE_PATH
            = "src/main/resources/templates"; //fixme (срабатывает абсолютный путь, относительный не хочет)

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

                Map<String, String> templateVars = new HashMap<>();
                templateVars.put("name", user.getName());
                templateVars.put("company", user.getClientCompany().getName());
                String age = String.valueOf(ChronoUnit.YEARS.between(user.getBirthday(), today));
                templateVars.put("age", age);

                Configuration configuration = new Configuration(Configuration.VERSION_2_3_30);
                StringBuilder content = new StringBuilder();
                try {
                    configuration.setDirectoryForTemplateLoading(new File(TEMPLATE_PATH));
                    String templateName = "birthday.ftl";
                    Template temp = configuration.getTemplate(templateName);
                    content.append(FreeMarkerTemplateUtils.processTemplateIntoString(
                            temp, templateVars));


                    String to = user.getEmail();
                    String subject = "Greeting";
                    String text = content.toString();
                    sendMail(to, subject, text);


                } catch (IOException e) {
                    log.error("Template getting failed", e);
                } catch (TemplateException e) {
                    log.error("Template exception occurred", e);
                } catch (ServiceException e) {
                    log.error(e.getMessage());
                }

            }
        }
    }

    public void sendMail(String to, String subject, String text) throws ServiceException {

        try {
            final MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "UTF-8");

            helper.setTo(to);
            helper.setFrom(fromEmail);
            helper.setSubject(subject);
            helper.setText(text, true);

            javaMailSender.send(mimeMessage);
            log.info("Message has been send to {} , subject is {}", to, subject);
        } catch (Exception e) {
            log.error("Mail sending failed", e);
            throw new ServiceException("Service for sending emails is temporary unavailable");
        }
    }

}
