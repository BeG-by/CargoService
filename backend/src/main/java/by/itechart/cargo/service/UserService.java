package by.itechart.cargo.service;

import by.itechart.cargo.dto.model_dto.user.UserInfoResponse;
import by.itechart.cargo.dto.model_dto.user.UserRequest;
import by.itechart.cargo.dto.model_dto.user.UserResponse;
import by.itechart.cargo.exception.AlreadyExistException;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.model.User;

import java.util.List;

public interface UserService {

    UserInfoResponse findInfo();

    List<UserResponse> findAll();

    void saveOne(UserRequest userRequest) throws AlreadyExistException;

    UserResponse findById(long id) throws NotFoundException;

}
