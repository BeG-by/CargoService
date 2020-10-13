package by.itechart.cargo.dto.model_dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ActivationDetailsRequest {

    @Email(message = "Email is invalid")
    @NotBlank(message = "Email is mandatory")
    private String email;

    @Pattern(regexp = "ADMIN|SYSADMIN|OWNER|MANAGER|DISPATCHER|DRIVER", message = "Role is invalid")
    @NotBlank(message = "Role is mandatory")
    private String role;

}
