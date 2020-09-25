package by.itechart.cargo.service;

import by.itechart.cargo.dto.model_dto.user.UserInfoResponse;
import by.itechart.cargo.dto.model_dto.user.UserSaveRequest;
import by.itechart.cargo.dto.model_dto.user.UserResponse;
import by.itechart.cargo.dto.model_dto.user.UserUpdateRequest;
import by.itechart.cargo.exception.AlreadyExistException;
import by.itechart.cargo.exception.NotFoundException;

import java.util.List;

public interface UserService {

    UserInfoResponse findInfo();

    UserResponse findById(long id) throws NotFoundException;

    List<UserResponse> findAll();

    void save(UserSaveRequest userRequest) throws AlreadyExistException;

    void update(UserUpdateRequest userUpdateRequest) throws NotFoundException, AlreadyExistException;

}
