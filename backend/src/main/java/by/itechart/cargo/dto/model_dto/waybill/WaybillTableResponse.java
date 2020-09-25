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
    private long invoiceId;
    private String invoiceNumber;
    private String auto;
    private String departureDate;
    private String arrivalDate;

    public WaybillTableResponse toWaybillTableResponse(Waybill waybill) {
        WaybillTableResponse response = new WaybillTableResponse();
        response.setId(waybill.getId());
        response.setInvoiceId(waybill.getInvoice().getId());
        response.setInvoiceNumber(waybill.getInvoice().getNumber());
        response.setAuto(waybill.getAuto().getMark() + " " + waybill.getAuto().getAutoType());
        response.setDepartureDate(waybill.getDepartureDate() == null ? null : waybill.getDepartureDate().toString());
        response.setArrivalDate(waybill.getArrivalDate() == null ? null : waybill.getArrivalDate().toString());
        return response;
    }
}
