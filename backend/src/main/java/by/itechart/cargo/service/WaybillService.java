package by.itechart.cargo.service;

import by.itechart.cargo.dto.model_dto.WaybillRequest;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.model.freight.Waybill;

import java.util.List;

public interface WaybillService {

    List<Waybill> findAll();

    void saveOne(WaybillRequest waybillRequest) throws NotFoundException;

}
