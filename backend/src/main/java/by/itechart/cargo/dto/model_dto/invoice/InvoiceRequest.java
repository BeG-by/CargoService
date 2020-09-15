package by.itechart.cargo.dto.model_dto.invoice;

import by.itechart.cargo.model.enumeration.InvoiceStatus;
import by.itechart.cargo.model.freight.Product;
import by.itechart.cargo.model.freight.Invoice;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceRequest {

    @Positive(message = "Id cannot be negative or zero")
    private Long id;

    @NotBlank(message = "Invoice number is mandatory")
    @Size(max = 64, message = "Invoice number is too long (max is 64)")
    private String invoiceNumber;

    private LocalDate registrationDate;

    @Size(max = 255, message = "Shipper is too long (max is 255)")
    private String shipper;
    @Size(max = 255, message = "Consignee is too long (max is 255)")
    private String consignee;

    @NotBlank
//    @InvoiceStatusType(message = "Status must be the one of InvoiceStatus type")
    private String status;

    @NotNull(message = "Driver id number is mandatory")
    private Long driverId;

    @NotNull(message = "Products is mandatory")
    @Valid
    private List<Product> products;

    public Invoice toInvoice() {
        return Invoice.builder()
                .id(id)
                .number(invoiceNumber)
                .registrationDate(registrationDate)
                .invoiceStatus(InvoiceStatus.valueOf(status))
                .shipper(shipper)
                .consignee(consignee)
                .products(products)
                .build();
    }

}
