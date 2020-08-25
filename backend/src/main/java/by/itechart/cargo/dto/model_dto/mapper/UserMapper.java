package by.itechart.cargo.dto.model_dto.mapper;

import by.itechart.cargo.dto.model_dto.UserDto;
import by.itechart.cargo.model.User;

public class UserMapper implements DtoMapper<UserDto, User> {

    @Override
    public UserDto mapToDto(User user) {
        UserDto dto = new UserDto();

        dto.setId(user.getId());
        dto.setLogin(user.getLogin());
        dto.setPassword(user.getPassword());
        dto.setName(user.getName());
        dto.setSurname(user.getSurname());
        dto.setPatronymic(user.getPatronymic());
        dto.setBirthday(user.getBirthday());

        AddressMapper addressMapper = new AddressMapper();
        dto.setAddress(addressMapper.mapToDto(user.getAddress()));
        dto.setEmail(user.getEmail());
        dto.setRoles(user.getRoles());
        dto.setClientCompanyId(user.getClientCompanyId());

        return dto;
    }

    @Override
    public User mapFromDto(UserDto userDto) {
        return null;
    }
}
