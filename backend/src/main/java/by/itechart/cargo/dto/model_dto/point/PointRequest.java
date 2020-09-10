package by.itechart.cargo.dto.model_dto.point;

import by.itechart.cargo.model.freight.Point;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.*;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PointRequest {

    @NotNull(message = "Place is mandatory")
    @NotBlank(message = "Place is mandatory")
    @Size(max = 255, message = "Place length has oversize")
    private String place;

    private boolean isPassed;

    @PastOrPresent(message = "Passage date must be past or present date")
    private LocalDateTime passageDate;

    @NotNull (message = "Waybill id is mandatory")
    @Positive(message = "Id cannot be negative or zero")
    private Long waybillId;

    public Point toPoint() {
        return Point.builder()
                .passageDate(passageDate)
                .isPassed(isPassed)
                .place(place)
                .build();
    }

}
