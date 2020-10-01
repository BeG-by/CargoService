package by.itechart.cargo.dto.model_dto.storage;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StorageUpdateRequest {

    //TODO validation

    private Long id;

    @NotBlank
    @Size(max = 64, message = "Country is too long (max is 64)")
    private String country;

    @NotBlank
    @Size(max = 64, message = "City is too long (max is 64)")
    private String city;

    @NotBlank
    @Size(max = 64, message = "Street is too long (max is 64)")
    private String street;

    @NotBlank
    @Size(max = 64, message = "House is too long (max is 64)")
    private String house;

    @Size(max = 64, message = "Flat is too long (max is 64)")
    private String flat;

    @Column(name = "phone", nullable = false)
    private String phone;

    @Column(name = "email", nullable = false)
    private String email;

    private Long productOwnerId;

    private String status;

}
