package by.itechart.cargo.service;

import by.itechart.cargo.dto.model_dto.client_company.ClientCompanyDto;
import by.itechart.cargo.exception.NotFoundException;

public interface ClientCompanyService {
    ClientCompanyDto findByName(String name) throws NotFoundException;

    ClientCompanyDto findByName(String name, int mappingFlags) throws NotFoundException;

    ClientCompanyDto findById(Long id) throws NotFoundException;

    ClientCompanyDto findById(Long id, int mappingFlags) throws NotFoundException;
}
