package by.itechart.cargo.service;

import by.itechart.cargo.dto.model_dto.waybill.WaybillRequest;
import by.itechart.cargo.dto.model_dto.waybill.WaybillTableResponse;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.model.freight.Waybill;
import java.util.List;
import java.util.Optional;

public interface WaybillService {

    List<Waybill> findAll();

    List<WaybillTableResponse> findAllTableData();

    Optional<Waybill> findById(long id);

    void saveOne(WaybillRequest waybillRequest) throws NotFoundException;

}
