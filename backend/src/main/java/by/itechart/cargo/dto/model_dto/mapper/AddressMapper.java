package by.itechart.cargo.dto.model_dto.mapper;


import by.itechart.cargo.dto.model_dto.AddressDto;
import by.itechart.cargo.model.Address;

public class AddressMapper implements DtoMapper<AddressDto, Address> {

    @Override
    public AddressDto mapToDto(Address address) {
        AddressDto dto = new AddressDto();

        dto.setCountry(address.getCountry());
        dto.setCity(address.getCity());
        dto.setStreet(address.getStreet());
        dto.setFlat(address.getFlat());
        dto.setHouse(address.getHouse());

        return dto;
    }

    @Override
    public Address mapFromDto(AddressDto addressDto) {
        return null;
    }
}

