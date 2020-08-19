package by.itechart.cargo.service;

import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.model.User;

public interface UserService {

    User findByLogin(String login) throws NotFoundException;

}
