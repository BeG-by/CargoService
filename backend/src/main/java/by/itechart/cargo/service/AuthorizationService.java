package by.itechart.cargo.service;

import by.itechart.cargo.dto.authorization_dto.AuthorizationRequest;
import by.itechart.cargo.dto.authorization_dto.AuthorizationResponse;
import by.itechart.cargo.dto.authorization_dto.Oauth2Request;
import by.itechart.cargo.dto.authorization_dto.ResetPasswordRequest;
import by.itechart.cargo.dto.model_dto.user.UserSaveRequest;
import by.itechart.cargo.exception.*;

public interface AuthorizationService {

    AuthorizationResponse login(AuthorizationRequest request) throws NotFoundException;

    void logout();

    void registration(UserSaveRequest request) throws NotFoundException, AlreadyExistException, IncorrectPasswordException;

    void resetPassword(String email) throws NotFoundException, ServiceException, AlreadyExistException;

    void resetPassword(ResetPasswordRequest request) throws IncorrectPasswordException, NotFoundException;

    AuthorizationResponse oauth2GoogleLogin(Oauth2Request request) throws NotFoundException, EmailsNotMatchException;

    String oauth2GitHubLogin(String authCode) throws NotFoundException;

}
