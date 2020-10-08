package by.itechart.cargo.dto.model_dto.storage;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StorageUpdateRequest {

    @Positive(message = "Id must be positive")
    private long id;

    @NotBlank(message = "Country is mandatory")
    @Size(max = 64, message = "Country is too long (max is 64)")
    private String country;

    @NotBlank(message = "City is mandatory")
    @Size(max = 64, message = "City is too long (max is 64)")
    private String city;

    @NotBlank(message = "Street is mandatory")
    @Size(max = 64, message = "Street is too long (max is 64)")
    private String street;

    @NotBlank(message = "House is mandatory")
    @Size(max = 64, message = "House is too long (max is 64)")
    private String house;

    @Size(max = 64, message = "Flat is too long (max is 64)")
    private String flat;

    @NotBlank(message = "Phone is mandatory")
    @Size(max = 64, message = "Phone is too long (max is 64)")
    private String phone;

    @Email(message = "Email is invalid")
    private String email;

    @Pattern(regexp = "ACTIVE|DELETED", message = "Status is invalid")
    private String status;

}
