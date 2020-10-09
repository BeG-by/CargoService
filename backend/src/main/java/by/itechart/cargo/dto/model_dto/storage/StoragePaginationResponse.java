package by.itechart.cargo.dto.model_dto.storage;

import by.itechart.cargo.model.Storage;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StoragePaginationResponse {
    private long totalAmount;
    private List<Storage> storages;
}
