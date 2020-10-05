package by.itechart.cargo.dto.model_dto;

import by.itechart.cargo.model.Storage;
import by.itechart.cargo.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class DriversAndStoragesDTO {
    List<User> drivers;
    List<Storage> storages;
}
