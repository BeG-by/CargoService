package by.itechart.cargo.repository;

import by.itechart.cargo.model.ClientCompany;
import by.itechart.cargo.model.freight.Driver;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DriverRepository extends JpaRepository<Driver, Long> {

    List<Driver> findByClientCompany(ClientCompany clientCompany);

}
