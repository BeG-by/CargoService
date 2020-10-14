package by.itechart.cargo.service;

import by.itechart.cargo.dto.model_dto.mail.MessageRequest;
import by.itechart.cargo.dto.model_dto.mail.MessageTemplateRequest;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.exception.ServiceException;
import by.itechart.cargo.model.User;


public interface MailSenderService {

    void sendBirthdayMailJob();

    void sendMail(String to, String subject, String text) throws ServiceException;

    void sendMail(MessageRequest request) throws ServiceException, NotFoundException;

    void sendMail(MessageTemplateRequest request) throws ServiceException, NotFoundException;

    String sendActivationMail(String to, String role) throws ServiceException;

    String sendResetPasswordMail(String to , User user) throws ServiceException;


}
