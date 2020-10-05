package by.itechart.cargo.dto.model_dto.invoice;

import by.itechart.cargo.dto.validation.EnumNamePattern;
import by.itechart.cargo.model.Invoice;
import by.itechart.cargo.model.Product;
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

    //todo: validate?
    private LocalDate registrationDate;

    @NotNull (message = "Product owner id is mandatory")
    private Long productOwnerId;

    @Positive(message = "Shipper id is mandatory")
    private Long shipperId;

    @Positive(message = "Consignee id is mandatory")
    private Long consigneeId;

    @NotNull (message = "Invoice status is mandatory")
    @EnumNamePattern(regexp = "REGISTERED|ACCEPTED|REJECTED|CLOSED|CLOSED_WITH_ACT",
            message = "Type must be one of InvoiceStatus types")
    private Invoice.Status status;

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
                .status(status)
                .products(products)
                .build();
    }

}
