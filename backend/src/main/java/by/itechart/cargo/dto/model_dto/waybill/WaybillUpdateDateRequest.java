package by.itechart.cargo.dto.model_dto.waybill;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.FutureOrPresent;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WaybillUpdateDateRequest {

    @Positive(message = "Id cannot be negative or zero")
    private Long id;

    @NotNull(message = "Departure date is mandatory")
    private LocalDate start;

    @NotNull(message = "Arrival date is mandatory")
    @FutureOrPresent(message = "Arrival date must be present or future date")
    private LocalDate end;


}
