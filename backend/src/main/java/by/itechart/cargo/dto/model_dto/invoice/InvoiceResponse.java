package by.itechart.cargo.dto.model_dto.invoice;

import by.itechart.cargo.dto.model_dto.product_owner.ProductOwnerDTO;
import by.itechart.cargo.model.*;
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
    private Invoice.Status status;
    private LocalDate registrationDate;
    private LocalDate checkingDate;
    private LocalDate closeDate;
    private Storage shipper;
    private Storage consignee;
    private User driver;
    private User registrationUser;
    private User checkingUser;
    private List<Product> products;
    private Waybill waybill;
    private Act act;
    private String comment;

    public static InvoiceResponse toInvoiceResponse(Invoice invoice) {
        InvoiceResponse response = new InvoiceResponse();
        response.setId(invoice.getId());
        response.setStatus(invoice.getStatus());
        response.setNumber(invoice.getNumber());
        response.setRegistrationDate(invoice.getRegistrationDate());
        response.setCheckingDate(invoice.getCheckingDate());
        response.setCloseDate(invoice.getCloseDate());
        response.setDriver(invoice.getDriver());
        response.setComment(invoice.getComment());
        response.setShipper(invoice.getShipper());
        response.setConsignee(invoice.getConsignee());
        response.setRegistrationUser(invoice.getRegistrationUser());
        response.setCheckingUser(invoice.getCheckingUser());
        response.setProducts(invoice.getProducts());
        response.setProductOwnerDTO(ProductOwnerDTO.fromProductOwner(invoice.getProductOwner()));
        response.setWaybill(invoice.getWaybill());
        response.setAct(invoice.getAct());
        return response;
    }

}
