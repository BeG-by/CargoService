package by.itechart.cargo.dto.model_dto.user;

import by.itechart.cargo.model.Address;
import by.itechart.cargo.model.Role;
import by.itechart.cargo.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.Valid;
import javax.validation.constraints.*;
import java.time.LocalDate;
import java.util.Set;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserUpdateRequest {

    @NotNull
    @Positive(message = "Id cannot be negative or zero")
    private Long id;

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

    @Pattern(regexp = "ACTIVE|BLOCKED|DELETED", message = "Status must be ACTIVE/BLOCKED/DELETED")
    private String status;

    @NotEmpty(message = "Roles in mandatory")
    private Set<String> roles;

    @Size(max = 64, message = "Password is too long (max is 64)")
    private String password;


    public static UserUpdateRequest fromUser(User user) {
        return UserUpdateRequest.builder()
                .id(user.getId())
                .name(user.getName())
                .surname(user.getSurname())
                .patronymic(user.getPatronymic())
                .birthday(user.getBirthday())
                .address(user.getAddress())
                .phone(user.getPhone())
                .passport(user.getPassport())
                .status(user.getStatus().toString())
                .roles(user.getRoles().stream().map(r -> r.getRole().toString()).collect(Collectors.toSet()))
                .password(user.getPassword())
                .build();
    }
}
