package by.itechart.cargo.dto.model_dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PhoneRequest {

    @NotBlank(message = "Phone is mandatory")
    private String phone;
}
