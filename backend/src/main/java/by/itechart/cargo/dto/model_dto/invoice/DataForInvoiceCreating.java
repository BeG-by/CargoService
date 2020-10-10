package by.itechart.cargo.dto.model_dto.invoice;

import by.itechart.cargo.model.Storage;
import by.itechart.cargo.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class DataForInvoiceCreating {
    private List<User> drivers;
    private List<Storage> storages;
    private List<User> managers;
}
