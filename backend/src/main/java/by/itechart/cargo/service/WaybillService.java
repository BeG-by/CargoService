package by.itechart.cargo.service;

import by.itechart.cargo.dto.model_dto.waybill.WaybillRequest;
import by.itechart.cargo.model.freight.Waybill;
import java.util.List;
import java.util.Optional;

public interface WaybillService {

    List<Waybill> findAll();

    Optional<Waybill> findById(long id);

    void save(WaybillRequest waybillRequest);

}
