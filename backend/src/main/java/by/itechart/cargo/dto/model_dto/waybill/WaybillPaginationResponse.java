package by.itechart.cargo.dto.model_dto.waybill;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class WaybillPaginationResponse {
    private Long totalAmount;
    private List<WaybillResponse> waybills;
}
