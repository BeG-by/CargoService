package by.itechart.cargo.service;

import by.itechart.cargo.exception.ServiceException;

public interface MailSenderService {

    void sendBirthdayMailJob();

    void sendMail(String to, String subject, String text) throws ServiceException;

    String sendActivationMail(String to , String role) throws ServiceException;

    enum TemplateName {
        BIRTHDAY("birthday.ftl"),
        BLOCKED("blocked.ftl"),
        ACTIVATION("activation.ftl");

        private String string;

        TemplateName(String string) {
            this.string = string;
        }

        @Override
        public String toString() {
            return string;
        }

    }

}
