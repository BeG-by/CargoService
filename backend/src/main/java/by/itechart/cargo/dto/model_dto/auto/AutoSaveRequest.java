package by.itechart.cargo.dto.model_dto.auto;

import by.itechart.cargo.model.Auto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AutoSaveRequest {

    @NotBlank(message = "Auto mark is mandatory")
    @Size(max = 64, message = "Mark length has oversize (max is 64)")
    private String mark;

    @NotBlank(message = "Number is mandatory")
    @Pattern(regexp = "[0-9A-Za-z-]}", message = "Number is invalid")
    private String number;

    @NotBlank(message = "Auto type is mandatory")
    private String autoType;

    @NotNull(message = "Consumption mandatory")
    private BigDecimal consumption;

    @Positive(message = "Max load must be positive number")
    private int maxLoad;

    @NotNull(message = "Date is mandatory")
    @PastOrPresent(message = "Date must be past or present")
    private LocalDate dateOfIssue;

    public Auto toAuto() {
        return Auto.builder()
                .mark(mark)
                .number(number)
                .autoType(Auto.AutoType.valueOf(autoType))
                .consumption(consumption)
                .maxLoad(maxLoad)
                .dateOfIssue(dateOfIssue)
                .status(Auto.Status.ACTIVE)
                .build();
    }

}
