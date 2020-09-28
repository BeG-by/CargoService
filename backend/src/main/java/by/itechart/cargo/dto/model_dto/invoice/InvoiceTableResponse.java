package by.itechart.cargo.dto.model_dto.invoice;

import by.itechart.cargo.model.Invoice;
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
    private String shipper;
    private String consignee;
    private String waybillId;

    public InvoiceTableResponse toInvoiceTableResponse(Invoice invoice) {
        InvoiceTableResponse response = new InvoiceTableResponse();
        response.setId(invoice.getId());
        response.setStatus(invoice.getStatus().name());
        response.setNumber(invoice.getNumber());
        response.setDate(invoice.getRegistrationDate().toString());
        response.setShipper(invoice.getShipper());
        response.setConsignee(invoice.getConsignee());
        response.setWaybillId(invoice.getWaybill() == null ? null : invoice.getWaybill().getId().toString());
        return response;
    }
}
