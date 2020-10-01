package by.itechart.cargo.dto.model_dto.act;

import by.itechart.cargo.model.Act;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ActRequest {

    @Positive(message = "Id cannot be negative or zero")
    private Long id;

    @NotNull(message = "Registration date is mandatory")
    private LocalDate registrationDate;

    @NotNull (message = "Invoice id is mandatory")
    @Positive(message = "Id cannot be negative or zero")
    private Long invoiceId;

    @NotNull(message = "Consignee worker is mandatory")
    private String consigneeWorker;

    @NotNull(message = "Lost products are mandatory")
    @Valid
    private List<ProductLostDto> products;

    public Act toAct() {
        return Act.builder()
                .id(id)
                .registrationDate(registrationDate)
                .consigneeWorker(consigneeWorker)
                .build();
    }

}
