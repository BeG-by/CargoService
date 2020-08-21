package by.itechart.cargo.dto.authorization_dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthorizationRequest {

    private String login;
    private String password;

}