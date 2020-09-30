package by.itechart.cargo.service;

import by.itechart.cargo.dto.model_dto.storage.StorageSaveRequest;
import by.itechart.cargo.dto.model_dto.storage.StorageUpdateRequest;
import by.itechart.cargo.exception.AlreadyExistException;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.model.Storage;

import java.util.List;

public interface StorageService {

    List<Storage> findAll();

    Storage findById(long id) throws NotFoundException;

    void save(StorageSaveRequest saveRequest) throws AlreadyExistException;

    void update(StorageUpdateRequest updateRequest) throws NotFoundException, AlreadyExistException;

    void delete(long id) throws NotFoundException;

}
