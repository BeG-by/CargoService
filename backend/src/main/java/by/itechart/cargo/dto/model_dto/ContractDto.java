package by.itechart.cargo.dto.model_dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ContractDto implements Serializable, Cloneable {
    private static final long serialVersionUID = 1238321313254844412L;

    @NotNull
    private Long id;

    @NotNull
    private LocalDate startDate;

    @NotNull
    private LocalDate expirationDate;

    @NotNull
    @Min(0)
    private BigDecimal payment;

    @NotNull
    private Long clientCompanyId;
}
