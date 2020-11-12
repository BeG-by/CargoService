package by.itechart.cargo.dto.authorization_dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Oauth2Request {

    @NotBlank(message = "Email is required")
    private String email;
    @NotBlank(message = "Access token is required")
    private String accessToken;

}
