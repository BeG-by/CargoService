package by.itechart.cargo.service;

import by.itechart.cargo.dto.model_dto.waybill.WaybillRequest;
import by.itechart.cargo.dto.model_dto.waybill.WaybillTableResponse;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.model.Waybill;

import java.util.List;

public interface WaybillService {

    Waybill findById(long id) throws NotFoundException;

    void save(WaybillRequest waybillRequest) throws NotFoundException;

    Waybill findByStatusAndDriverId(Long id);

    WaybillPaginationResponse findAllByRegistrationUser(Integer page, Integer waybillsPerPage);

    WaybillPaginationResponse findAllByRegistrationUserAndInvoiceNumber(String invoiceNumber, Integer page, Integer waybillsPerPage);

    WaybillPaginationResponse findAllByDriver(Integer page, Integer waybillsPerPage);

    WaybillPaginationResponse findAllByDriverAndInvoiceNumber(String invoiceNumber, Integer page, Integer waybillsPerPage);


}
