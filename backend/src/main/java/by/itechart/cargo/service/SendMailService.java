package by.itechart.cargo.service;

import by.itechart.cargo.exception.ServiceException;

public interface SendMailService {

    void sendBirthdayMail();

    void sendActivateLink(String email, String code) throws ServiceException;
}
