package by.itechart.cargo.service;

import by.itechart.cargo.dto.model_dto.act.ActRequest;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.model.Act;

public interface ActService {

    Act findById(long id) throws NotFoundException;

    void save(ActRequest actRequest) throws NotFoundException;

}
