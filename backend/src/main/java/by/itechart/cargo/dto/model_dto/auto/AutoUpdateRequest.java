package by.itechart.cargo.dto.model_dto.auto;

import by.itechart.cargo.model.Auto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AutoUpdateRequest {

    private Long id;

    @NotBlank(message = "Auto mark is mandatory")
    @Size(max = 64, message = "Mark length has oversize (max is 64)")
    private String mark;

    //TODO validation
    private String number;

    @NotBlank(message = "Auto type is mandatory")
    private String autoType;

    private BigDecimal consumption;

    private LocalDate dateOfIssue;

    private String status;



}
