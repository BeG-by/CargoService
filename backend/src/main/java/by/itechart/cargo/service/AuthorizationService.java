package by.itechart.cargo.service;

import by.itechart.cargo.dto.AuthorizationRequest;
import by.itechart.cargo.dto.AuthorizationResponse;
import by.itechart.cargo.exception.NotFoundException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface AuthorizationService {

    AuthorizationResponse login(AuthorizationRequest request) throws NotFoundException;

    void logout(HttpServletRequest req, HttpServletResponse resp);

}
