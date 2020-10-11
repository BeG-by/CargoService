package by.itechart.cargo.service.impl;

import by.itechart.cargo.model.User;
import by.itechart.cargo.repository.UserRepository;
import by.itechart.cargo.service.SendMailService;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

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
            = "C:\\Users\\Администратор.000\\IdeaProjects\\CargoApp\\backend\\src\\main\\resources\\templates";

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
                templateVars.put("age",age);

                Configuration configuration = new Configuration(Configuration.VERSION_2_3_30);
                StringBuffer content = new StringBuffer();
                try {
                    configuration.setDirectoryForTemplateLoading(new File(TEMPLATE_PATH));
                    String templateName = "birthday.ftl";
                    Template temp = configuration.getTemplate(templateName);
                    content.append(FreeMarkerTemplateUtils.processTemplateIntoString(
                            temp, templateVars));
                } catch (IOException e) {
                    e.printStackTrace();
                    log.info("Template getting failed");
                } catch (TemplateException e) {
                    log.info("Template exception occurred");
                }

                String to = user.getEmail();
                String subject = "Greeting";
                String text = content.toString();
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
            e.printStackTrace();
            log.error("Mail sending failed");
        }
    }

}
