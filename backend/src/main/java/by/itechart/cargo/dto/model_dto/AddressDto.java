package by.itechart.cargo.dto.model_dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Size;
import java.io.Serializable;

//todo: add constraints (NotBlank for ClientCompanyDto but empty for UserDto)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddressDto implements Serializable, Cloneable {

    @Size(max = 64)
    private String country;

    @Size(max = 64)
    private String city;

    @Size(max = 64)
    private String street;

    @Size(max = 64)
    private String flat;

    @Size(max = 64)
    private String house;
}