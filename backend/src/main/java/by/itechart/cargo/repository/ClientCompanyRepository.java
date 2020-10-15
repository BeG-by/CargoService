package by.itechart.cargo.repository;

import by.itechart.cargo.model.ClientCompany;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ClientCompanyRepository extends JpaRepository<ClientCompany, Long> {


    @Query("FROM ClientCompany c WHERE c.status <> 'DELETED'")
    List<ClientCompany> findAllNotDeleted();

    @Query("FROM ClientCompany c WHERE c.status <> 'DELETED' AND c.id = :id")
    Optional<ClientCompany> findByIdAndNotDeleted(Long id);

    Optional<ClientCompany> findByName(String name);

    Optional<ClientCompany> findByPayerAccountNumber(String number);

    Optional<ClientCompany> findByEmail(String email);
}
