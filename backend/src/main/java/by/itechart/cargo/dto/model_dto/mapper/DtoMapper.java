package by.itechart.cargo.dto.model_dto.mapper;

public interface DtoMapper<Dto, Entity> {
    Dto mapToDto(Entity entity);

    Entity mapFromDto(Dto dto);
}
