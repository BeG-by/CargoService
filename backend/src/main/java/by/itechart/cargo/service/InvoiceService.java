package by.itechart.cargo.service;

import by.itechart.cargo.dto.model_dto.waybill.InvoiceRequest;
import by.itechart.cargo.model.freight.Invoice;

import java.util.List;

public interface InvoiceService {

    List<Invoice> findAll();

    void saveOne(InvoiceRequest invoiceRequest);

}
