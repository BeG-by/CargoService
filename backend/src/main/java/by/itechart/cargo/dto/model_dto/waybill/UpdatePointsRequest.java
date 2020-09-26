package by.itechart.cargo.dto.model_dto.waybill;

import by.itechart.cargo.model.freight.Point;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PastOrPresent;
import javax.validation.constraints.Positive;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdatePointsRequest {

    @Positive(message = "Id cannot be negative or zero")
    private Long id;

    @NotNull
    @PastOrPresent
    private LocalDate passageDate;

    public Point toPoint() {
        return Point.builder()
                .id(id)
                .passageDate(passageDate)
                .build();
    }

}
