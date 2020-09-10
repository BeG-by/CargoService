package by.itechart.cargo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Address {

    @Size(max = 64, message = "Country is too long (max is 64)")
    private String country;

    @Size(max = 64, message = "City is too long (max is 64)")
    private String city;

    @Size(max = 64, message = "Street is too long (max is 64)")
    private String street;

    @Size(max = 64, message = "House is too long (max is 64)")
    private String house;

    @Size(max = 64, message = "Flat is too long (max is 64)")
    private String flat;

}
