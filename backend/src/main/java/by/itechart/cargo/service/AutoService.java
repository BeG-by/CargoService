package by.itechart.cargo.service;

import by.itechart.cargo.dto.model_dto.auto.AutoRequest;
import by.itechart.cargo.model.freight.Auto;
import java.util.List;
import java.util.Optional;

public interface AutoService {

    List<Auto> findAll();

    Optional<Auto> findById(long id);

    void saveOne(AutoRequest autoRequest);

}
