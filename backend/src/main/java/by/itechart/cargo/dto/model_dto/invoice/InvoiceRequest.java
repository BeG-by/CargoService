package by.itechart.cargo.dto.model_dto.invoice;

import by.itechart.cargo.model.freight.Product;
import by.itechart.cargo.model.freight.Invoice;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceRequest {

    @NotBlank(message = "Invoice number is mandatory")
    @Size(max = 64, message = "Invoice number is too long (max is 64)")
    private String invoiceNumber;

    private LocalDate registrationDate;

    private String shipper;
    private String consignee;

    @NotNull(message = "Driver id number is mandatory")
    private Long driverId;

    @NotNull(message = "Products is mandatory")
    @Valid
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
