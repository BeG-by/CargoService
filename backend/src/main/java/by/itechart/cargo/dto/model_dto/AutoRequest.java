package by.itechart.cargo.dto.model_dto;

import by.itechart.cargo.model.freight.Auto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AutoRequest {

    @NotNull
    @Size(max = 64)
    private String mark;

    @NotNull
    private String type;

    public Auto toAuto() {
        return Auto.builder()
                .mark(mark)
                .autoType(Auto.AutoType.valueOf(type))
                .build();
    }

}
