package by.itechart.cargo.dto.model_dto;

import by.itechart.cargo.model.freight.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WaybillRequest {

    private String number;
    private LocalDate registrationDate;
    private LocalDate checkingDate;
    private String shipper;
    private String consignee;
    private Long driverId;
//    private List<Product> products;

}
