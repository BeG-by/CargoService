package by.itechart.cargo.dto.model_dto;

import by.itechart.cargo.model.Role;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto implements Serializable, Cloneable {

    private static final long serialVersionUID = 3348698989065400383L;

    @NotNull
    private Long id;

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

    @Valid
    @NotNull
    private AddressDto address;

    @Email
    @Size(max = 64)
    private String email;

    @JsonManagedReference
    Set<Role> roles = new HashSet<>();

    @NotNull
    private Long clientCompanyId;
}