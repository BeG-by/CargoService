package by.itechart.cargo.service.util;

import by.itechart.cargo.exception.ServiceException;
import by.itechart.cargo.model.ClientCompany;
import by.itechart.cargo.model.User;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.Map;

@Component
@Slf4j
public class TemplateUtil {

    private Configuration configuration;
    private Map<TemplateType, String> templateNamesMap;

    @PostConstruct
    private void init() {
        configuration = new Configuration(Configuration.VERSION_2_3_30);
        configuration.setClassForTemplateLoading(TemplateUtil.class, "/templates");
        configuration.setDefaultEncoding("UTF-8");

        templateNamesMap = new HashMap<>();
        templateNamesMap.put(TemplateType.BIRTHDAY, "birthday.ftl");
        templateNamesMap.put(TemplateType.BLOCKED, "blocked.ftl");
        templateNamesMap.put(TemplateType.ACTIVATION, "activation.ftl");

    }


    public String getBirthdayTemplate(User user) throws ServiceException {
        LocalDate today = LocalDate.now();

        Map<String, String> templateVars = new HashMap<>();
        templateVars.put("name", user.getName());
        templateVars.put("company", user.getClientCompany().getName());
        String age = String.valueOf(ChronoUnit.YEARS.between(user.getBirthday(), today));
        templateVars.put("age", age);

        StringBuilder content = new StringBuilder();
        try {

            String templateName = templateNamesMap.get(TemplateType.BIRTHDAY);
            Template temp = configuration.getTemplate(templateName);
            content.append(FreeMarkerTemplateUtils.processTemplateIntoString(
                    temp, templateVars));

            return content.toString();
        } catch (IOException | TemplateException e) {
            log.error("Template getting failed", e);
            throw new ServiceException("Service temporary unavailable");
        }

    }


    public String getActivationTemplate(String link) throws ServiceException {

        Map<String, String> templateVars = new HashMap<>();
        templateVars.put("link", link);

        StringBuilder content = new StringBuilder();

        try {
            String templateName = templateNamesMap.get(TemplateType.ACTIVATION);
            final Template template = configuration.getTemplate(templateName);

            content.append(FreeMarkerTemplateUtils.processTemplateIntoString(
                    template, templateVars));
            return content.toString();
        } catch (IOException | TemplateException e) {
            log.error("Template getting failed", e);
            throw new ServiceException("Service temporary unavailable");
        }
    }

    public String getBlockedTemplate(User user) throws ServiceException {

        Map<String, Object> templateVars = new HashMap<>();
        templateVars.put("user", user);

        StringBuilder content = new StringBuilder();
        try {

            String templateName = templateNamesMap.get(TemplateType.BLOCKED);
            Template temp = configuration.getTemplate(templateName);
            content.append(FreeMarkerTemplateUtils.processTemplateIntoString(
                    temp, templateVars));

            return content.toString();
        } catch (IOException | TemplateException e) {
            log.error("Template getting failed", e);
            throw new ServiceException("Service temporary unavailable");
        }
    }

    public Map<String, String> getAllContent() throws ServiceException {

        final ClientCompany clientCompany = new ClientCompany();
        clientCompany.setName("Company");

        final User mockUser = User.builder()
                .name("Ivan")
                .surname("Ivanov")
                .patronymic("Ivanovich")
                .clientCompany(clientCompany)
                .birthday(LocalDate.of(1990, 1, 1))
                .build();

        final String birthdayTemplate = getBirthdayTemplate(mockUser);
        final String blockedTemplate = getBlockedTemplate(mockUser);

        Map<String, String> map = new HashMap<>();
        map.put(TemplateType.BIRTHDAY.toString(), birthdayTemplate);
        map.put(TemplateType.BLOCKED.toString(), blockedTemplate);
        return map;
    }


}
