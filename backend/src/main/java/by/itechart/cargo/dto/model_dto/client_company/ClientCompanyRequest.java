package by.itechart.cargo.dto.model_dto.client_company;

import by.itechart.cargo.dto.validation.EnumNamePattern;
import by.itechart.cargo.model.Address;
import by.itechart.cargo.model.ClientCompany;
import by.itechart.cargo.model.enumeration.CompanyType;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;

@Data
@NoArgsConstructor
public class ClientCompanyRequest implements Serializable, Cloneable {

    @Positive(message = "Id cannot be negative or zero")
    private Long id;

    @NotBlank(message = "Name is mandatory")
    @Size(max = 64, message = "Name is too long (max is 64)")
    private String name;

    //TODO enums invalid message to client
    @NotNull(message = "Client company type is mandatory")
    @EnumNamePattern(regexp = "SP|JP", message = "Type must be \"SP\" or \"JP\"")
    private CompanyType type;

    @Pattern(regexp = "[a-zA-z0-9]{9}", message = "Payer account number must be 9 digits")
    private String payerAccountNumber;

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

    @NotBlank(message = "Flat is mandatory")
    @Size(max = 64, message = "Flat is too long (max is 64)")
    private String flat;

    @NotNull(message = "Registration date is mandatory")
    private LocalDate registrationDate;

    @Email(message = "Email is mandatory")
    @Size(max = 64, message = "Email is too long (max is 64)")
    private String email;

    public ClientCompany toClientCompany() {
        return ClientCompany.builder()
                .name(name)
                .type(type)
                .payerAccountNumber(payerAccountNumber)
                .address(new Address(country, city, street, house, flat))
                .registrationDate(registrationDate)
                .email(email)
                .build();
    }

}
