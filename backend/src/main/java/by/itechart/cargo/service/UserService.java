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

    UserResponse findDriverByInvoiceId(Long invoiceId) throws NotFoundException;

    UserResponse findDispatcherByInvoiceId(Long invoiceId) throws NotFoundException;

    UserResponse findManagerByInvoiceId(Long invoiceId) throws NotFoundException;

    void sendActivationLink(ActivationDetailsRequest request) throws AlreadyExistException, ServiceException;

    void update(UserUpdateRequest userUpdateRequest) throws NotFoundException;

    void delete(long id) throws NotFoundException;

    void updatePhoto(PhotoRequest photoRequest, long userId) throws NotFoundException;

    void updatePhone(PhoneRequest photoRequest) throws NotFoundException;

    void updatePassword(PasswordRequest passwordRequest) throws IncorrectPasswordException;
}
