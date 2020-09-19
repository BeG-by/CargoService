package by.itechart.cargo.dto.model_dto.user;

import by.itechart.cargo.model.ClientCompany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoResponse {

    private UserResponse user;
    private ClientCompany company;

}
