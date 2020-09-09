package by.itechart.cargo.dto.model_dto;

import by.itechart.cargo.model.freight.Product;
import by.itechart.cargo.model.freight.Invoice;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceRequest {

    private String invoiceNumber;
    private LocalDate registrationDate;
    private String shipper;
    private String consignee;
    private Long driverId;
    private List<Product> products;

    public Invoice toInvoice() {
        return Invoice.builder()
                .number(invoiceNumber)
                .registrationDate(registrationDate)
                .shipper(shipper)
                .consignee(consignee)
                .products(products)
                .build();
    }

}
