package by.itechart.cargo.service;

import by.itechart.cargo.dto.model_dto.client_company.ClientCompanyRequest;
import by.itechart.cargo.exception.AlreadyExistException;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.model.ClientCompany;

import java.util.List;

public interface ClientCompanyService {

    ClientCompany findById(Long id) throws NotFoundException;

    List<ClientCompany> findAll();

    void saveOne(ClientCompanyRequest clientCompanyRequest) throws AlreadyExistException;

    void update(ClientCompanyRequest companyRequest) throws NotFoundException;

    void delete(Long id) throws NotFoundException;
}
