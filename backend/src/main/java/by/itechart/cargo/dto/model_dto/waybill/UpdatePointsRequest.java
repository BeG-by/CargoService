package by.itechart.cargo.dto.model_dto.waybill;

import by.itechart.cargo.model.Point;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.validation.constraints.Positive;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdatePointsRequest {

    @Positive(message = "Id cannot be negative or zero")
    private Long id;

    public Point toPoint() {
        return Point.builder()
                .id(id)
                .build();
    }

}
