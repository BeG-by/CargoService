package by.itechart.cargo.service;

import by.itechart.cargo.dto.model_dto.invoice.DataForInvoiceCreating;
import by.itechart.cargo.dto.model_dto.invoice.InvoicePaginationResponse;
import by.itechart.cargo.dto.model_dto.invoice.InvoiceRequest;
import by.itechart.cargo.dto.model_dto.invoice.InvoiceResponse;
import by.itechart.cargo.dto.model_dto.invoice.UpdateInvoiceStatusRequest;
import by.itechart.cargo.exception.AlreadyExistException;
import by.itechart.cargo.exception.NotFoundException;

public interface InvoiceService {

    InvoicePaginationResponse findAll(int requestedPage, int invoicesPerPage);

    InvoicePaginationResponse findAllForDriver(int requestedPage, int invoicesPerPage);

    InvoicePaginationResponse findAllForManager(int requestedPage, int invoicesPerPage);

    InvoicePaginationResponse findAllForDispatcher(int requestedPage, int invoicesPerPage);

    InvoicePaginationResponse findAllByNumberStartsWith(String numberStartStr, int requestedPage, int invoicesPerPage);

    InvoicePaginationResponse findAllByNumberStartsWithForDriver(String numberStartStr, int requestedPage, int invoicesPerPage);

    InvoicePaginationResponse findAllByNumberStartsWithForManager(String numberStartStr, int requestedPage, int invoicesPerPage);

    InvoicePaginationResponse findAllByNumberStartsWithForDispatcher(String numberStartStr, int requestedPage, int invoicesPerPage);

    InvoiceResponse findById(long id) throws NotFoundException;

    DataForInvoiceCreating findDataForInvoiceCreating();

    Long save(InvoiceRequest invoiceRequest) throws AlreadyExistException, NotFoundException;

    void updateInvoice(InvoiceRequest invoiceRequest) throws NotFoundException, AlreadyExistException;

    void updateStatus(UpdateInvoiceStatusRequest invoiceRequest) throws NotFoundException;
}
