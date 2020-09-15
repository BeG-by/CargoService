package by.itechart.cargo.dto.model_dto.invoice;

import by.itechart.cargo.model.enumeration.InvoiceStatus;
import by.itechart.cargo.model.freight.Invoice;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class UpdateInvoiceStatusRequest {

    @Positive(message = "Id cannot be negative or zero")
    private Long id;

    @NotBlank
//    @InvoiceStatusType(message = "Status must be the one of InvoiceStatus type")
    private String status;

    public Invoice toInvoice() {
        return Invoice.builder()
                .id(id)
                .invoiceStatus(InvoiceStatus.valueOf(status))
                .build();
    }

}
