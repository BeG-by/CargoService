package by.itechart.cargo.dto.model_dto.product_owner;

import by.itechart.cargo.model.Address;
import by.itechart.cargo.model.enumeration.CompanyType;
import by.itechart.cargo.model.freight.ProductOwner;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductOwnerDTO {
    private Long id;

    @NotBlank(message = "Password is mandatory")
    @Size(max = 64, message = "Name is too long (max is 64)")
    private String name;

    //todo: enum validation
    private CompanyType type;

    //todo: date validation
    private LocalDate registrationDate;

    @Valid
    private Address address;

    @Size(max = 64, message = "Phone is too long (max is 64)")
    private String phone;

    public static ProductOwnerDTO fromProductOwner(ProductOwner productOwner) {
        return ProductOwnerDTO.builder()
                .id(productOwner.getId())
                .address(productOwner.getAddress())
                .name(productOwner.getName())
                .phone(productOwner.getPhone())
                .registrationDate(productOwner.getRegistrationDate())
                .type(productOwner.getType())
                .build();
    }
}
