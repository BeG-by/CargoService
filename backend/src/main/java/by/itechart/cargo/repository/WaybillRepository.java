package by.itechart.cargo.repository;

import by.itechart.cargo.model.Waybill;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface WaybillRepository extends JpaRepository<Waybill, Long> {

    List<Waybill> findALlByIdIsIn(List<Long> ids);

    @Query("SELECT w FROM Waybill w JOIN w.invoice i ON w.invoice.id = i.id " +
            "WHERE i.clientCompany.id = :clientCompanyId ")
    Page<Waybill> findAllByClientCompanyId(Long clientCompanyId, Pageable pageable);

    @Query("SELECT w FROM Waybill w JOIN w.invoice i ON w.invoice.id = i.id " +
            "WHERE i.clientCompany.id = :clientCompanyId " +
            "AND i.driver.id = :driverId")
    Page<Waybill> findAllByClientCompanyIdAndDriverId(Long clientCompanyId, Long driverId, Pageable pageable);

    @Query("SELECT w FROM Waybill w JOIN w.invoice i ON w.invoice.id = i.id " +
            "WHERE i.clientCompany.id = :clientCompanyId " +
            "AND i.checkingUser.id = :registrationUserId")
    Page<Waybill> findAllByClientCompanyIdAndRegistrationUserId(Long clientCompanyId, Long registrationUserId, Pageable pageable);

    @Query("SELECT w FROM Waybill w " +
            "JOIN w.points p ON p.waybill.id = w.id " +
            "JOIN w.invoice i ON w.invoice.id = i.id " +
            "WHERE p.id = :pointId " +
            "AND i.clientCompany.id = :clientCompanyId")
    Optional<Waybill> findByClientCompanyIdAndPointId(Long clientCompanyId, Long pointId);

    @Query("SELECT w FROM Waybill w JOIN w.invoice i ON w.invoice.id = i.id " +
            "WHERE i.clientCompany.id = :clientCompanyId " +
            "AND i.driver.id = :driverId " +
            "AND w.status = 'CURRENT'")
    Waybill findByStatusAndDriverIdY(Long driverId, Long clientCompanyId);

    @Query("SELECT w FROM Waybill w JOIN w.invoice i ON w.invoice.id = i.id " +
            "WHERE i.clientCompany.id = :clientCompanyId " +
            "AND i.driver.id = :driverId " +
            "AND w.status = 'FUTURE'")
    List<Waybill> findAllByStatusAndDriverIdY(Long driverId, Long clientCompanyId);

}
