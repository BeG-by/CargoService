package by.itechart.cargo.dto.model_dto.invoice;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class InvoicePaginationResponse {
    long totalInvoicesAmount;
    List<InvoiceResponse> invoices;
}
