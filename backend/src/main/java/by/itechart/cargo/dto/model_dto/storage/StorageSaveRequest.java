package by.itechart.cargo.dto.model_dto.storage;

import by.itechart.cargo.model.Address;
import by.itechart.cargo.model.Storage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StorageSaveRequest {

    //TODO validation

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


    public Storage toStorage() {
        return Storage.builder()
                .address(new Address(country, city, street, house, flat))
                .phone(phone)
                .email(email)
                .status(Storage.Status.ACTIVE)
                .build();
    }

}
