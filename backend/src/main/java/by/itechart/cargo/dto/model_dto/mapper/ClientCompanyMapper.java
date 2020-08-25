package by.itechart.cargo.dto.model_dto.mapper;

import by.itechart.cargo.dto.model_dto.ClientCompanyDto;
import by.itechart.cargo.dto.model_dto.ContractDto;
import by.itechart.cargo.model.ClientCompany;
import by.itechart.cargo.model.Contract;

import java.util.ArrayList;

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

        //todo: optimize address mapper creating
        AddressMapper addressMapper = new AddressMapper();
        dto.setAddress(addressMapper.mapToDto(clientCompany.getAddress()));

        if (isMapWithContractsFlagSet(flags)) {
            //todo: optimize contract mapper creating
            ContractDtoMapper contractDtoMapper = new ContractDtoMapper();
            ArrayList<ContractDto> contracts = new ArrayList<>();
            for (Contract contract : clientCompany.getContracts()) {
                contracts.add(contractDtoMapper.mapToDto(contract));
            }
            dto.setContracts(contracts);
        }
        if (isMapWithUsersFlagSet(flags)) {
            dto.setUsers(clientCompany.getUsers());
        }

        return dto;
    }

    private static ClientCompanyDto.Type mapFromClientCompanyType(ClientCompany.Type clientCompanyType) {
        switch (clientCompanyType) {
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
