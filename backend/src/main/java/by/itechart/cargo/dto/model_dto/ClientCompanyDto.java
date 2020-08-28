package by.itechart.cargo.dto.model_dto;

import by.itechart.cargo.model.Address;
import by.itechart.cargo.model.Contract;
import by.itechart.cargo.model.User;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.Valid;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
public class ClientCompanyDto implements Serializable, Cloneable {
    private static final long serialVersionUID = 1238695483261000456L;

    @NotNull
    private Long id;

    @NotBlank(message = "Name is mandatory")
    @Size(max = 64)
    private String name;

    @NotNull(message = "Client company type is mandatory")
    private Type type;

    @NotEmpty(message = "Payer account number is mandatory")
    @Size(max = 64)
    private String payerAccountNumber;

    @Valid
    @NotNull
    private Address address;

    @NotNull(message = "Registration date is mandatory")
    private LocalDate registrationDate;

    @Email(message = "Email is mandatory")
    @Size(max = 64)
    private String email;

    private List<User> users;

    private List<Contract> contracts;

    public enum Type {
        SP, //Sole proprietorship
        JP //Juridical person
    }
}

