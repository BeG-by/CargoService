package by.itechart.cargo.dto.authorization_dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResetPasswordRequest {

    @NotBlank(message = "Password is mandatory")
    @Size(min = 4 , max = 16, message = "Password must contain 4-16 symbols")
    private String password;

    @NotBlank(message = "Password is mandatory")
    @Size(min = 4 , max = 16, message = "Password must contain 4-16 symbols")
    private String confirm;

    @NotBlank(message = "Access denied!")
    private String code;
}
