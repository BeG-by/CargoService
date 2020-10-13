package by.itechart.cargo.service;

import by.itechart.cargo.dto.authorization_dto.AuthorizationRequest;
import by.itechart.cargo.dto.authorization_dto.AuthorizationResponse;
import by.itechart.cargo.dto.model_dto.user.UserSaveRequest;
import by.itechart.cargo.exception.AlreadyExistException;
import by.itechart.cargo.exception.IncorrectPasswordException;
import by.itechart.cargo.exception.NotFoundException;

public interface AuthorizationService {

    AuthorizationResponse login(AuthorizationRequest request) throws NotFoundException;

    void logout();

    void registration(UserSaveRequest request) throws NotFoundException, AlreadyExistException, IncorrectPasswordException;

}
