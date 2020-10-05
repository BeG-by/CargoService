package by.itechart.cargo.service;

import by.itechart.cargo.dto.model_dto.DriversAndStoragesDTO;
import by.itechart.cargo.dto.model_dto.invoice.InvoicePaginationResponse;
import by.itechart.cargo.dto.model_dto.invoice.InvoiceRequest;
import by.itechart.cargo.dto.model_dto.invoice.InvoiceResponse;
import by.itechart.cargo.dto.model_dto.invoice.UpdateInvoiceStatusRequest;
import by.itechart.cargo.exception.AlreadyExistException;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.model.Invoice;

import java.util.List;

public interface InvoiceService {

    InvoicePaginationResponse findAll(int requestedPage, int invoicesPerPage);

    InvoiceResponse findById(long id) throws NotFoundException;

    DriversAndStoragesDTO findDataForInvoiceCreating();

    void save(InvoiceRequest invoiceRequest) throws AlreadyExistException, NotFoundException;

    void updateInvoice(InvoiceRequest invoiceRequest) throws NotFoundException, AlreadyExistException;

    void updateStatus(UpdateInvoiceStatusRequest invoiceRequest) throws NotFoundException;
}
