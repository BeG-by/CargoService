package by.itechart.cargo.dto.authorization_dto;

import by.itechart.cargo.dto.model_dto.client_company.ClientCompanyDTO;
import by.itechart.cargo.dto.model_dto.user.UserResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthorizationResponse {

    private String token;
    private UserResponse user;
    private ClientCompanyDTO company;

}
