package by.itechart.cargo.dto;

import by.itechart.cargo.model.freight.Point;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PointRequest {

    private String place;
    private boolean isPassed;
    private LocalDateTime passageDate;
    private Long waybillId;

    public Point toPoint() {
        return Point.builder()
                .passageDate(passageDate)
                .isPassed(isPassed)
                .place(place)
                .build();
    }

}
