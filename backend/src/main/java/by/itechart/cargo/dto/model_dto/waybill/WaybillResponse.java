package by.itechart.cargo.dto.model_dto.waybill;

import by.itechart.cargo.model.Invoice;
import by.itechart.cargo.model.Point;
import by.itechart.cargo.model.Waybill;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WaybillResponse {

    private long id;
    private Invoice invoice;
    private String status;
    private String auto;
    private String departureDate;
    private String arrivalDate;
    private List<Point> points;

    public static WaybillResponse toWaybillResponse(Waybill waybill) {
        WaybillResponse response = new WaybillResponse();
        response.setId(waybill.getId());
        response.setStatus(waybill.getStatus().name());
        response.setInvoice(waybill.getInvoice());
        response.setPoints(waybill.getPoints());
        response.setAuto(waybill.getAuto().getMark() + " " + waybill.getAuto().getAutoType());
        response.setDepartureDate(waybill.getDepartureDate() == null ? null : waybill.getDepartureDate().toString());
        response.setArrivalDate(waybill.getArrivalDate() == null ? null : waybill.getArrivalDate().toString());
        return response;
    }

    public static List<WaybillResponse> toWaybillResponses(List<Waybill> waybills) {
        return waybills.stream()
                .map(WaybillResponse::toWaybillResponse)
                .collect(Collectors.toList());
    }
}
