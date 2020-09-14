package by.itechart.cargo.dto.model_dto.invoice;

import by.itechart.cargo.model.freight.Invoice;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceTableResponse {

    private long id;
    private String status;
    private String number;
    private String date;

    public InvoiceTableResponse toInvoiceTableResponse(Invoice invoice) {
        InvoiceTableResponse response = new InvoiceTableResponse();
        response.setId(invoice.getId());
        response.setStatus(invoice.getInvoiceStatus().name());
        response.setNumber(invoice.getNumber());
        response.setDate(invoice.getRegistrationDate().toString());
        return response;
    }
}
