package by.itechart.cargo.dto.model_dto.user;

import by.itechart.cargo.model.Address;
import by.itechart.cargo.model.User;
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
public class UserSaveRequest {

    @NotBlank(message = "Login is mandatory")
    @Size(max = 64, message = "Login is too long (max is 64)")
    private String login;

    @NotBlank(message = "Password is mandatory")
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
    @NotNull(message = "Birthday is mandatory")
    private LocalDate birthday;

    @Valid
    private Address address;

    @Email(message = "Email is not valid")
    @Size(max = 64, message = "Patronymic is too long (max is 64)")
    @NotNull(message = "Email is mandatory")
    private String email;

    @Size(max = 64, message = "Passport is too long (max is 64)")
    private String passport;

    @NotNull
    // TODO Enum validations - ?
    private Set<String> roles;

    public User toUser() {
        return User.builder()
                .login(login)
                .password(password)
                .name(name)
                .surname(surname)
                .patronymic(patronymic)
                .birthday(birthday)
                .address(address)
                .email(email)
                .passport(passport)
                .build();
    }

}
