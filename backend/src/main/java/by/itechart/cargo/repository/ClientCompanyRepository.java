package by.itechart.cargo.repository;

import by.itechart.cargo.model.ClientCompany;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ClientCompanyRepository extends JpaRepository<ClientCompany, Long> {


    @Query("FROM ClientCompany c WHERE c.status <> 'DELETED'")
    List<ClientCompany> findAll();

    @Query("FROM ClientCompany c WHERE c.status <> 'DELETED' AND c.id = :id")
    Optional<ClientCompany> findById(Long id);

    @Query("FROM ClientCompany c WHERE c.status <> 'DELETED' AND c.name = :name")
    Optional<ClientCompany> findByName(String name);

    @Query("FROM ClientCompany c WHERE c.status <> 'DELETED' AND c.payerAccountNumber = :number")
    Optional<ClientCompany> findByPayerAccountNumber(String number);

    @Query("FROM ClientCompany c WHERE c.status <> 'DELETED' AND c.email = :email")
    Optional<ClientCompany> findByEmail(String email);

}
