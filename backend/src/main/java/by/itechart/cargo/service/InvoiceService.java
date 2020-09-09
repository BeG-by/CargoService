package by.itechart.cargo.service;

import by.itechart.cargo.dto.model_dto.InvoiceRequest;
import by.itechart.cargo.model.freight.Invoice;
import java.util.List;
import java.util.Optional;

public interface InvoiceService {

    List<Invoice> findAll();

    Optional<Invoice> findById(long id);

    void saveOne(InvoiceRequest invoiceRequest);

}
