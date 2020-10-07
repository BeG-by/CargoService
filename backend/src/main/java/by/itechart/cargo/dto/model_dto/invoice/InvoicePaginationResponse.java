package by.itechart.cargo.dto.model_dto.invoice;

import by.itechart.cargo.model.Invoice;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class InvoicePaginationResponse {
    long totalInvoicesAmount;
    List<InvoiceResponse> invoices;
}
