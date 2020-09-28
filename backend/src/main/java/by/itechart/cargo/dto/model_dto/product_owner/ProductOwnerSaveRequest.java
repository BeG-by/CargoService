package by.itechart.cargo.dto.model_dto.product_owner;

import by.itechart.cargo.model.Address;
import by.itechart.cargo.model.ProductOwner;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductOwnerSaveRequest implements Serializable, Cloneable {

    @NotBlank(message = "Name is mandatory")
    @Size(max = 64, message = "Name is too long (max is 64)")
    private String name;

    @Pattern(regexp = "SP|JP")
    private String type;

    @Valid
    private Address address;

    //todo: date validation
    private LocalDate registrationDate;

    @Size(max = 64, message = "Phone is too long (max is 64)")
    private String phone;

    public ProductOwner toProductOwner() {
        return ProductOwner.builder()
                .name(name)
                .address(address)
                .status(ProductOwner.Status.ACTIVE)
                .type(ProductOwner.CompanyType.valueOf(type))
                .registrationDate(registrationDate)
                .phone(phone)
                .build();
    }
}