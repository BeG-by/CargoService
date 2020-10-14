package by.itechart.cargo.service;

import by.itechart.cargo.dto.model_dto.waybill.WaybillPaginationResponse;
import by.itechart.cargo.dto.model_dto.waybill.WaybillRequest;
import by.itechart.cargo.dto.notification.notification_data.WaybillNotificationData;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.model.Waybill;


public interface WaybillService {

    Waybill findById(long id) throws NotFoundException;

    Long save(WaybillRequest waybillRequest) throws NotFoundException;

    Waybill findByStatusAndDriverId(Long id);

    Waybill findByStatusAndDriverId();

    Waybill findByPointId(Long pointId) throws NotFoundException;

    WaybillPaginationResponse findAllByRegistrationUser(Integer page, Integer waybillsPerPage);

    WaybillPaginationResponse findAllByRegistrationUserAndInvoiceNumber(String invoiceNumber, Integer page, Integer waybillsPerPage);

    WaybillPaginationResponse findAllByDriver(Integer page, Integer waybillsPerPage);

    WaybillPaginationResponse findAllByDriverAndInvoiceNumber(String invoiceNumber, Integer page, Integer waybillsPerPage);

    WaybillPaginationResponse findAllByInvoiceNumber(String invoiceNumber, Integer page, Integer waybillsPerPage);

    WaybillPaginationResponse findAll(Integer page, Integer waybillsPerPage);

    WaybillNotificationData findWaybillNotificationData(Long id) throws NotFoundException;
}
