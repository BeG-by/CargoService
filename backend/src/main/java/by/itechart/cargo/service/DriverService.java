package by.itechart.cargo.service;

import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.model.freight.Driver;
import java.util.List;

public interface DriverService {

    List<Driver> findAll();

    Driver findById(long id) throws NotFoundException;

}
