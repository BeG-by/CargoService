package by.itechart.cargo.dto.model_dto.waybill;

import by.itechart.cargo.model.freight.Point;
import by.itechart.cargo.model.freight.Waybill;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.validation.constraints.FutureOrPresent;
import javax.validation.constraints.NotNull;
<<<<<<< HEAD
=======
import javax.validation.constraints.PastOrPresent;
import javax.validation.constraints.Positive;
>>>>>>> master
import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WaybillRequest {

    @NotNull(message = "Departure date is mandatory")
    private LocalDate departureDate;

    @NotNull (message = "Arrival date is mandatory")
    @FutureOrPresent(message = "Arrival date must be present or future date")
    private LocalDate arrivalDate;

    @NotNull (message = "Auto id is mandatory")
    @Positive(message = "Id cannot be negative or zero")
    private Long autoId;

    @NotNull (message = "Invoice id is mandatory")
    @Positive(message = "Id cannot be negative or zero")
    private Long invoiceId;

    // TODO validations
    private List<Point> points;

    public Waybill toWaybill() {
        return Waybill.builder()
                .departureDate(departureDate)
                .arrivalDate(arrivalDate)
                .points(points)
                .build();
    }

}
