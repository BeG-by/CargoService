package by.itechart.cargo.dto.model_dto;

import by.itechart.cargo.model.freight.Product;
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

    private String waybillNumber;
    private LocalDate registrationDate;
    private String shipper;
    private String consignee;
    private Long driverId;
    private List<Product> products;

    public Waybill toWayBill() {
        return Waybill.builder()
                .number(waybillNumber)
                .registrationDate(registrationDate)
                .shipper(shipper)
                .consignee(consignee)
                .products(products)
                .build();
    }

}
