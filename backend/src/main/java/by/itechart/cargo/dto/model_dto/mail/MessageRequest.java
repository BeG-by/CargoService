package by.itechart.cargo.dto.model_dto.mail;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MessageRequest {

    @NotEmpty(message = "Emails in required")
    private List<String> emails;

    @NotBlank(message = "Subject is required")
    @Size(max = 255, message = "Mark length has oversize (max is 255)")
    private String subject;

    @NotBlank(message = "Text is required")
    @Size(max = 2500, message = "Mark length has oversize (max is 2500)")
    private String text;


}
