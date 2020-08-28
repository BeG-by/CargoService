package by.itechart.cargo.service;

import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.model.User;

import java.util.List;

public interface UserService {

    User findByLogin(String login) throws NotFoundException;

    List<User> findByClientCompanyId(Long clientCompanyId) throws NotFoundException;
}
