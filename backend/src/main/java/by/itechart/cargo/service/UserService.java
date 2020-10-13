package by.itechart.cargo.service;

import by.itechart.cargo.dto.model_dto.user.*;
import by.itechart.cargo.exception.AlreadyExistException;
import by.itechart.cargo.exception.IncorrectPasswordException;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.exception.ServiceException;

import java.util.List;

public interface UserService {

    UserInfoResponse findInfo();

    UserResponse findById(long id) throws NotFoundException;

    List<UserResponse> findAll();

    void save(UserAddRequest userRequest) throws AlreadyExistException, ServiceException;

    void update(UserUpdateRequest userUpdateRequest) throws NotFoundException, AlreadyExistException;

    void delete(long id) throws NotFoundException;

    void updatePhoto(PhotoRequest photoRequest , long userId) throws NotFoundException;

    void updatePhone(PhoneRequest photoRequest) throws NotFoundException;

    void updatePassword(PasswordRequest passwordRequest) throws IncorrectPasswordException;

}
