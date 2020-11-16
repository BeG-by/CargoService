package by.itechart.cargo.service;

import by.itechart.cargo.dto.authorization_dto.AuthorizationRequest;
import by.itechart.cargo.dto.authorization_dto.AuthorizationResponse;
import by.itechart.cargo.dto.authorization_dto.Oauth2Request;
import by.itechart.cargo.dto.authorization_dto.ResetPasswordRequest;
import by.itechart.cargo.dto.model_dto.user.UserSaveRequest;
import by.itechart.cargo.exception.AlreadyExistException;
import by.itechart.cargo.exception.IncorrectPasswordException;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.exception.ServiceException;

public interface AuthorizationService {

    AuthorizationResponse login(AuthorizationRequest request) throws NotFoundException;

    void logout();

    void registration(UserSaveRequest request) throws NotFoundException, AlreadyExistException, IncorrectPasswordException;

    void resetPassword(String email) throws NotFoundException, ServiceException, AlreadyExistException;

    void resetPassword(ResetPasswordRequest request) throws IncorrectPasswordException, NotFoundException;

    AuthorizationResponse oauth2login(Oauth2Request request) throws NotFoundException, IncorrectPasswordException;

}
