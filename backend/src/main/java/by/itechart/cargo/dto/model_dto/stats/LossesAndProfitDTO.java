package by.itechart.cargo.dto.model_dto.stats;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LossesAndProfitDTO {

    private LocalDate date;
    private String profit;
    private String losses;

}
