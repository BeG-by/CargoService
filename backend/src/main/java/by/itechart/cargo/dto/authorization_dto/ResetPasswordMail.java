package by.itechart.cargo.dto.authorization_dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResetPasswordMail {

    @NotBlank(message = "Email is mandatory")
    @Size(max = 64, message = "Email is too long (max is 64)")
    private String email;

}
