package by.itechart.cargo.dto.model_dto;

import by.itechart.cargo.model.freight.Point;
import by.itechart.cargo.model.freight.Waybill;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WaybillRequest {

    private LocalDate departureDate;
    private LocalDate arrivalDate;
    private Long autoId;
    private Long invoiceId;
    private List<Point> points;

    public Waybill toWaybill() {
        return Waybill.builder()
                .departureDate(departureDate)
                .arrivalDate(arrivalDate)
                .points(points)
                .build();
    }

}
