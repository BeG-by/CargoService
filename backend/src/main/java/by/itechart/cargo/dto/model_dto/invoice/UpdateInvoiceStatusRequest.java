package by.itechart.cargo.dto.model_dto.invoice;

import by.itechart.cargo.dto.validation.EnumNamePattern;
import by.itechart.cargo.model.enumeration.InvoiceStatus;
import by.itechart.cargo.model.freight.Invoice;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Max;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class UpdateInvoiceStatusRequest {

    @Positive(message = "Id cannot be negative or zero")
    private Long id;

    @EnumNamePattern(regexp = "REGISTERED|ACCEPTED|REJECTED|CLOSED|CLOSED_WITH_ACT",
            message = "Type must be one of InvoiceStatus types")
    @NotNull
    private InvoiceStatus status;

    @NotNull
    @Size(max = 500, message = "Comment length is greater than 500 symbols")
    private String comment;

    public Invoice toInvoice() {
        return Invoice.builder()
                .id(id)
                .invoiceStatus(status)
                .comment(comment)
                .build();
    }

}
