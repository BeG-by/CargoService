package by.itechart.cargo.repository;

import by.itechart.cargo.model.Auto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AutoRepository extends JpaRepository<Auto, Long> {

    Optional<Auto> findByIdAndClientCompanyId(Long autoId, Long clientCompanyId);

    @Query("FROM Auto u WHERE u.clientCompany.id = :clientCompanyId AND u.status <> 'DELETED'")
    List<Auto> findAllWithoutDeleted(Long clientCompanyId);

    Optional<Auto> findByNumberAndClientCompanyId(String number, Long clientCompanyId);

}
