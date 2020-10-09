package by.itechart.cargo.repository;

import by.itechart.cargo.model.Auto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AutoRepository extends JpaRepository<Auto, Long> {

    Optional<Auto> findByIdAndClientCompanyId(Long autoId, Long clientCompanyId);

    Long countAllByClientCompanyIdAndStatus(Long clientCompanyId, Auto.Status status);

    List<Auto> findAllByClientCompanyIdAndStatus(Long clientCompanyId, Auto.Status status, Pageable pageable);

    Optional<Auto> findByNumberAndClientCompanyId(String number, Long clientCompanyId);

}
