package by.itechart.cargo.dto.model_dto.product_owner;

import by.itechart.cargo.model.Address;
import by.itechart.cargo.model.ProductOwner;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductOwnerInvoiceResponse {

    private Long id;
    private String name;
    private ProductOwner.CompanyType type;
    private LocalDate registrationDate;
    private Address address;
    private String phone;

    public static ProductOwnerInvoiceResponse fromProductOwner(ProductOwner productOwner) {
        return ProductOwnerInvoiceResponse.builder()
                .id(productOwner.getId())
                .address(productOwner.getAddress())
                .name(productOwner.getName())
                .phone(productOwner.getPhone())
                .registrationDate(productOwner.getRegistrationDate())
                .type(productOwner.getType())
                .build();
    }
}
