package by.itechart.cargo.dto.model_dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PhoneRequest {

    @NotBlank(message = "Phone is mandatory")
    @Size(max = 64, message = "Phone is too long (max is 64)")
    private String phone;
}
