package by.itechart.cargo.dto.model_dto.invoice;

import by.itechart.cargo.dto.model_dto.product_owner.ProductOwnerDTO;
import by.itechart.cargo.model.User;
import by.itechart.cargo.model.enumeration.InvoiceStatus;
import by.itechart.cargo.model.freight.Invoice;
import by.itechart.cargo.model.freight.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceResponse {

    private Long id;
    private ProductOwnerDTO productOwnerDTO;
    private String number;
    private InvoiceStatus invoiceStatus;
    private LocalDate registrationDate;
    private LocalDate checkingDate;
    private LocalDate closeDate;
    private String shipper;
    private String consignee;
    private User driver;
    private User registrationUser;
    private User checkingUser;
    private List<Product> products;
    private Long waybillId;
    private String comment;

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
        response.setComment(invoice.getComment());
        response.setConsignee(invoice.getConsignee());
        response.setRegistrationUser(invoice.getRegistrationUser());
        response.setCheckingUser(invoice.getCheckingUser());
        response.setProducts(invoice.getProducts());
        response.setProductOwnerDTO(ProductOwnerDTO.fromProductOwner(invoice.getProductOwner()));
        response.setWaybillId(invoice.getWaybill() == null ? null : invoice.getWaybill().getId());
        return response;
    }

}
