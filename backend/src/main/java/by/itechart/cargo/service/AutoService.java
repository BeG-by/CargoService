package by.itechart.cargo.service;

import by.itechart.cargo.dto.model_dto.auto.AutoSaveRequest;
import by.itechart.cargo.dto.model_dto.auto.AutoUpdateRequest;
import by.itechart.cargo.exception.AlreadyExistException;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.model.Auto;

import java.util.List;

public interface AutoService {

    List<Auto> findAll();

    Auto findById(long id) throws NotFoundException;

    void save(AutoSaveRequest autoSaveRequest) throws AlreadyExistException;

    void update(AutoUpdateRequest autoSaveRequest) throws NotFoundException, AlreadyExistException;

    void delete(long id) throws NotFoundException;

}
