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


    @NotBlank(message = "Password is mandatory")
    @Size(max = 64, message = "Password is too long (max is 64)")
    private String password;

    @NotBlank(message = "Confirm password is mandatory")
    @Size(max = 64, message = "Confirm password is too long (max is 64)")
    private String confirmPassword;

    @NotBlank(message = "Name is mandatory")
    @Size(max = 64, message = "Name is too long (max is 64)")
    private String name;

    @NotBlank(message = "Surname is mandatory")
    @Size(max = 64, message = "Surname is too long (max is 64)")
    private String surname;

    @NotBlank(message = "Patronymic is mandatory")
    @Size(max = 64, message = "Patronymic is too long (max is 64)")
    private String patronymic;

    @NotNull(message = "Birthday is mandatory")
    private LocalDate birthday;

    @Valid
    private Address address;

    @NotBlank(message = "Phone is mandatory")
    @Size(max = 64, message = "Phone is too long (max is 64)")
    private String phone;

    @Size(max = 64, message = "Passport is too long (max is 64)")
    private String passport;

    @NotBlank(message = "Access denied. Activation code is required")
    private String activationCode;

    public User toUser() {
        return User.builder()
                .password(password)
                .name(name)
                .surname(surname)
                .patronymic(patronymic)
                .birthday(birthday)
                .address(address)
                .phone(phone)
                .passport(passport)
                .build();
    }

}
