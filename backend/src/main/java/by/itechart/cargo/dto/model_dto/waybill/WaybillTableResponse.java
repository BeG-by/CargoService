package by.itechart.cargo.dto.model_dto.waybill;

import by.itechart.cargo.model.freight.Waybill;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WaybillTableResponse {

    private long id;
    private String departureDate;
    private String arrivalDate;

    public WaybillTableResponse toWaybillTableResponse(Waybill waybill) {
        WaybillTableResponse response = new WaybillTableResponse();
        response.setId(waybill.getId());
        response.setDepartureDate(waybill.getDepartureDate().toString());
        response.setArrivalDate(waybill.getArrivalDate().toString());
        return response;
    }
}
