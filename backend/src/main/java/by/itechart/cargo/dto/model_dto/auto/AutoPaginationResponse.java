package by.itechart.cargo.dto.model_dto.auto;

import by.itechart.cargo.model.Auto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AutoPaginationResponse {
    private long totalAmount;
    private List<Auto> autoList;
}
