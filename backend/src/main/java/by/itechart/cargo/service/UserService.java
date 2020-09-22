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

    List<UserResponse> findAll();

    void saveOne(UserSaveRequest userSaveRequest) throws AlreadyExistException;

    UserResponse findById(long id) throws NotFoundException;

    void update(UserUpdateRequest userUpdateRequest) throws NotFoundException, AlreadyExistException;

}
