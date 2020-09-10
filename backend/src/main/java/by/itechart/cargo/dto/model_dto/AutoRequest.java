package by.itechart.cargo.dto.model_dto;

import by.itechart.cargo.model.freight.Auto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AutoRequest {

    @NotNull (message = "Auto mark is mandatory")
    @NotBlank(message = "Auto mark is mandatory")
    @Size(max = 64, message = "Mark length has oversize")
    private String mark;

    @NotNull(message = "Auto type is mandatory")
    @NotBlank(message = "Auto type is mandatory")
    private String type;

    public Auto toAuto() {
        return Auto.builder()
                .mark(mark)
                .autoType(Auto.AutoType.valueOf(type))
                .build();
    }

}
