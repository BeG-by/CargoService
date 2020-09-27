package by.itechart.cargo.service;

import by.itechart.cargo.dto.model_dto.auto.AutoRequest;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.model.Auto;
import java.util.List;

public interface AutoService {

    List<Auto> findAll();

    Auto findById(long id) throws NotFoundException;

    void save(AutoRequest autoRequest);

}
