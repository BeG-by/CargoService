package by.itechart.cargo.service;

import by.itechart.cargo.dto.model_dto.waybill.WaybillRequest;
import by.itechart.cargo.dto.model_dto.waybill.WaybillTableResponse;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.model.Waybill;

import java.util.List;

public interface WaybillService {

    List<Waybill> findAll();

    List<WaybillTableResponse> findAllTableData();

    Waybill findById(long id) throws NotFoundException;

    void save(WaybillRequest waybillRequest) throws NotFoundException;

    Waybill findByStatusAndDriverId();

    Waybill findByStatusAndDriverId(Long id);

}
