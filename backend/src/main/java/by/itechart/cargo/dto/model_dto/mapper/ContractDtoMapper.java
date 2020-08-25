package by.itechart.cargo.dto.model_dto.mapper;

import by.itechart.cargo.dto.model_dto.ContractDto;
import by.itechart.cargo.model.Contract;

public class ContractDtoMapper implements DtoMapper<ContractDto, Contract> {

    @Override
    public ContractDto mapToDto(Contract contract) {
        ContractDto dto = new ContractDto();
        dto.setId(contract.getId());
        dto.setStartDate(contract.getStartDate());
        dto.setExpirationDate(contract.getExpirationDate());
        dto.setClientCompanyId(contract.getClientCompanyId());
        dto.setPayment(contract.getPayment());

        return dto;
    }

    @Override
    public Contract mapFromDto(ContractDto contractDto) {
        return null;
    }
}
