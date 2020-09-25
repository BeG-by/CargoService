package by.itechart.cargo.repository;

import by.itechart.cargo.model.ClientCompany;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ClientCompanyRepository extends JpaRepository<ClientCompany, Long> {

    Optional<ClientCompany> getByName(String name);

    Optional<ClientCompany> getByPayerAccountNumber(String number);

    Optional<ClientCompany> getByEmail(String email);

}
