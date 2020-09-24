package by.itechart.cargo.dto.model_dto.product_owner;

import by.itechart.cargo.model.Address;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.Valid;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductOwnerUpdateRequest implements Serializable, Cloneable {

    @NotNull
    @Positive
    private Long id;

    @NotBlank(message = "Password is mandatory")
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
}