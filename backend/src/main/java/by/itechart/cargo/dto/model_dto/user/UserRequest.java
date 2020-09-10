package by.itechart.cargo.dto.model_dto.user;

import by.itechart.cargo.model.Address;
import by.itechart.cargo.model.Role;
import by.itechart.cargo.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.Set;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {

    @NotBlank(message = "Login is mandatory")
    @Size(max = 64)
    private String login;

    @NotBlank(message = "Password is mandatory")
    @Size(max = 64)
    private String password;

    @NotBlank(message = "Name is mandatory")
    @Size(max = 64)
    private String name;

    @NotBlank(message = "Surname is mandatory")
    @Size(max = 64)
    private String surname;

    @NotBlank(message = "Patronymic is mandatory")
    @Size(max = 64)
    private String patronymic;

    private LocalDate birthday;
    private Address address;

    @Email
    @Size(max = 64)
    private String email;

    @NotNull
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
                .roles(roles.stream().map(r -> new Role(Role.RoleType.valueOf(r))).collect(Collectors.toSet()))
                .build();
    }

}
