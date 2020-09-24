package by.itechart.cargo.service;

import by.itechart.cargo.dto.model_dto.user.UserResponse;
import by.itechart.cargo.exception.NotFoundException;

import java.util.List;

public interface DriverService {

    List<UserResponse> findAll();

    UserResponse findById(long id) throws NotFoundException;

}
