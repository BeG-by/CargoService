package by.itechart.cargo.service;

import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.model.ClientCompany;

public interface ClientCompanyService {
    ClientCompany findByName(String name) throws NotFoundException;
}
