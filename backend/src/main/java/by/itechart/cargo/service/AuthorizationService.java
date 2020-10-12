package by.itechart.cargo.service;

import by.itechart.cargo.dto.authorization_dto.AuthorizationRequest;
import by.itechart.cargo.dto.authorization_dto.AuthorizationResponse;
import by.itechart.cargo.exception.NotFoundException;

public interface AuthorizationService {

    AuthorizationResponse login(AuthorizationRequest request) throws NotFoundException;

    void logout();

}
