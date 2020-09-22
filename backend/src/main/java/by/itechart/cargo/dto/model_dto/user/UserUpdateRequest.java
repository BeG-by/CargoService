package by.itechart.cargo.dto.model_dto.user;

import by.itechart.cargo.model.Address;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.Valid;
import javax.validation.constraints.*;
import java.time.LocalDate;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdateRequest {

    @NotNull
    @Positive(message = "Id cannot be negative or zero")
    private Long id;

    @NotBlank(message = "Login is mandatory")
    @Size(max = 64, message = "Login is too long (max is 64)")
    private String login;

    @Size(max = 64, message = "Password is too long (max is 64)")
    private String password;

    @NotBlank(message = "Name is mandatory")
    @Size(max = 64, message = "Name is too long (max is 64)")
    private String name;

    @NotBlank(message = "Surname is mandatory")
    @Size(max = 64, message = "Surname is too long (max is 64)")
    private String surname;

    @NotBlank(message = "Patronymic is mandatory")
    @Size(max = 64, message = "Patronymic is too long (max is 64)")
    private String patronymic;

    // TODO date validation - ?
    private LocalDate birthday;

    @Valid
    private Address address;

    @Email(message = "Email is not valid")
    @Size(max = 64, message = "Patronymic is too long (max is 64)")
    private String email;

    @NotNull
    // TODO Enum validations - ?
    private Set<String> roles;

}
