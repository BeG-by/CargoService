package by.itechart.cargo.dto.model_dto.client_company;

public interface DtoMapper<Dto, Entity> {
    Dto mapToDto(Entity entity);

    Entity mapFromDto(Dto dto);
}
