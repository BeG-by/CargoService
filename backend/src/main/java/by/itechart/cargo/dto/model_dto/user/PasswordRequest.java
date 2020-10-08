package by.itechart.cargo.dto.model_dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PasswordRequest {


    @NotBlank(message = "Old password is mandatory")
    @Size(min = 5 , max = 16, message = "Old password must contain 5-16 symbols")
    private String oldPassword;

    @NotBlank(message = "New password is mandatory")
    @Size(min = 5 , max = 16, message = "New password must contain 5-16 symbols")
    private String newPassword;

    @NotBlank(message = "Confirming password is mandatory")
    @Size(min = 5 , max = 16, message = "Confirming password must contain 5-16 symbols")
    private String confirmNewPassword;

}
