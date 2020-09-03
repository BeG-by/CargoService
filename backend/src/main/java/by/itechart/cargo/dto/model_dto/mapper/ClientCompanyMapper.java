package by.itechart.cargo.dto.model_dto.mapper;

import by.itechart.cargo.dto.model_dto.ClientCompanyDto;
import by.itechart.cargo.model.ClientCompany;
import by.itechart.cargo.model.enumeration.CompanyType;

public class ClientCompanyMapper implements DtoMapper<ClientCompanyDto, ClientCompany> {
    public static final int MAP_WITH_CONTRACTS = 1;
    public static final int MAP_WITH_USERS = 2;

    @Override
    public ClientCompanyDto mapToDto(ClientCompany clientCompany) {
        return mapToDto(clientCompany, 0);
    }

    public ClientCompanyDto mapToDto(ClientCompany clientCompany, int flags) {
        ClientCompanyDto dto = new ClientCompanyDto();

        dto.setId(clientCompany.getId());
        dto.setName(clientCompany.getName());
        dto.setType(mapFromClientCompanyType(clientCompany.getType()));
        dto.setPayerAccountNumber(clientCompany.getPayerAccountNumber());
        dto.setRegistrationDate(clientCompany.getRegistrationDate());
        dto.setEmail(clientCompany.getEmail());
        dto.setAddress(clientCompany.getAddress());

        if (isMapWithContractsFlagSet(flags)) {
            dto.setContracts(clientCompany.getContracts());
        }
        if (isMapWithUsersFlagSet(flags)) {
            dto.setUsers(clientCompany.getUsers());
        }

        return dto;
    }

    private static ClientCompanyDto.Type mapFromClientCompanyType(CompanyType companyType) {
        switch (companyType) {
            case JP:
                return ClientCompanyDto.Type.JP;
            case SP:
                return ClientCompanyDto.Type.SP;
            default:
                return null;
        }
    }

    private boolean isMapWithUsersFlagSet(int flags) {
        return (flags & MAP_WITH_USERS) == MAP_WITH_USERS;
    }

    private boolean isMapWithContractsFlagSet(int flags) {
        return (flags & MAP_WITH_CONTRACTS) == MAP_WITH_CONTRACTS;
    }

    @Override
    public ClientCompany mapFromDto(ClientCompanyDto clientCompanyDto) {
        return null;
    }
}
