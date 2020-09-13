package by.itechart.cargo.service;

import by.itechart.cargo.dto.model_dto.invoice.InvoiceRequest;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.model.freight.Invoice;
import java.util.List;

public interface InvoiceService {

    List<Invoice> findAll();

    Invoice findById(long id) throws NotFoundException;

    void saveOne(InvoiceRequest invoiceRequest);

}
