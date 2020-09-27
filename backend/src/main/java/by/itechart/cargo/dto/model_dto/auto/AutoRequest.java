package by.itechart.cargo.dto.model_dto.auto;

import by.itechart.cargo.model.Auto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AutoRequest {


    @NotBlank(message = "Auto mark is mandatory")
    @Size(max = 64, message = "Mark length has oversize (max is 64)")
    private String mark;

    @NotBlank(message = "Auto type is mandatory")
    private String type;

    public Auto toAuto() {
        return Auto.builder()
                .mark(mark)
                .autoType(Auto.AutoType.valueOf(type))
                .build();
    }

}
