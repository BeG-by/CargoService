package by.itechart.cargo.service.impl;

import by.itechart.cargo.model.freight.Driver;
import by.itechart.cargo.repository.DriverRepository;
import by.itechart.cargo.service.DriverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class DriverServiceImpl implements DriverService {

    private final DriverRepository driverRepository;

    @Autowired
    public DriverServiceImpl(DriverRepository driverRepository) {
        this.driverRepository = driverRepository;
    }

    // TODO fix company id
    @Override
    public List<Driver> findAll() {
        return driverRepository.findAll();
    }


}
