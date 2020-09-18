package by.itechart.cargo.dto.model_dto.invoice;

import by.itechart.cargo.model.User;
import by.itechart.cargo.model.enumeration.InvoiceStatus;
import by.itechart.cargo.model.freight.Driver;
import by.itechart.cargo.model.freight.Invoice;
import by.itechart.cargo.model.freight.Product;
import lombok.*;
import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceResponse {

    private Long id;
    private String number;
    private InvoiceStatus invoiceStatus;
    private LocalDate registrationDate;
    private LocalDate checkingDate;
    private LocalDate closeDate;
    private String shipper;
    private String consignee;
    private Driver driver;
    private User registrationUser;
    private User checkingUser;
    private List<Product> products;
    private Long waybillId;

    public InvoiceResponse toInvoiceResponse(Invoice invoice) {
        InvoiceResponse response = new InvoiceResponse();
        response.setId(invoice.getId());
        response.setInvoiceStatus(invoice.getInvoiceStatus());
        response.setNumber(invoice.getNumber());
        response.setRegistrationDate(invoice.getRegistrationDate());
        response.setCheckingDate(invoice.getCheckingDate());
        response.setCloseDate(invoice.getCloseDate());
        response.setDriver(invoice.getDriver());
        response.setShipper(invoice.getShipper());
        response.setConsignee(invoice.getConsignee());
        response.setRegistrationUser(invoice.getRegistrationUser());
        response.setCheckingUser(invoice.getCheckingUser());
        response.setProducts(invoice.getProducts());
        response.setWaybillId(invoice.getWaybill() == null ? null : invoice.getWaybill().getId());
        return response;
    }

}
