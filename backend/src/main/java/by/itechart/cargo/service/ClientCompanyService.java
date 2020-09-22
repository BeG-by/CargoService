package by.itechart.cargo.service;

import by.itechart.cargo.dto.model_dto.client_company.ClientCompanyDTO;
import by.itechart.cargo.exception.AlreadyExistException;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.model.ClientCompany;

import java.util.List;

public interface ClientCompanyService {

    ClientCompany findById(Long id) throws NotFoundException;

    List<ClientCompany> findAll();

    void saveOne(ClientCompanyDTO clientCompanyDTO) throws AlreadyExistException;

    void update(ClientCompanyDTO companyRequest) throws NotFoundException, AlreadyExistException;

    void delete(Long id) throws NotFoundException;
}
