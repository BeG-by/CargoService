package by.itechart.cargo.repository;

import by.itechart.cargo.model.Auto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AutoRepository extends JpaRepository<Auto, Long> {

    Optional<Auto> findByIdAndClientCompanyId(Long autoId, Long clientCompanyId);

    Page<Auto> findAllByClientCompanyIdAndStatusIsIn(Long clientCompanyId, List<Auto.Status> autoTypes, Pageable pageable);

    List<Auto> findAllByClientCompanyIdAndStatusIsIn(Long clientCompanyId, List<Auto.Status> autoTypes);

    @Query("FROM Auto a WHERE a.clientCompany.id = :clientCompanyId AND a.status <> 'DELETED'")
    Page<Auto> findAllByClientCompanyIdAndNotDeleted(Long clientCompanyId, Pageable pageable);

    @Query("FROM Auto a WHERE a.clientCompany.id = :clientCompanyId AND a.status <> 'DELETED'")
    List<Auto> findAllByClientCompanyIdAndNotDeleted(Long clientCompanyId);

    Optional<Auto> findByNumberAndClientCompanyId(String number, Long clientCompanyId);

}
