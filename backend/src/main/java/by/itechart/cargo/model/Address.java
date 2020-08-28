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
    private String country;

    @NotBlank
    @Size(max = 64)
    private String city;

    @NotBlank
    @Size(max = 64)
    private String street;

    @NotBlank
    @Size(max = 64)
    private String flat;

    @NotBlank
    @Size(max = 64)
    private String house;
}
