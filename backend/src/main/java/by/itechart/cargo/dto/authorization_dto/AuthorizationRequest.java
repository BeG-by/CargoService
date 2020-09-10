package by.itechart.cargo.dto.authorization_dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthorizationRequest {

    @NotBlank(message = "Login is mandatory")
    @Size(max = 16, message = "Login is too long (max is 16)")
    private String login;

    @NotBlank(message = "Password is mandatory")
    @Size(max = 16, message = "Password is too long (max is 16)")
    private String password;

}
