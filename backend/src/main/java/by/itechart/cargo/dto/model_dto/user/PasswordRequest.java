package by.itechart.cargo.dto.model_dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PasswordRequest {

    //TODO validation

    private String oldPassword;
    private String newPassword;
    private String confirmNewPassword;

}
