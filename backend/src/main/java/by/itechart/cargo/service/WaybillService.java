package by.itechart.cargo.service;

import by.itechart.cargo.model.freight.Waybill;

import java.util.List;

public interface WaybillService {

    List<Waybill> findAll();

    void saveOne(Waybill waybill);

}
