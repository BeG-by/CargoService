package by.itechart.cargo.repository;

import by.itechart.cargo.model.Waybill;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface WaybillRepository extends JpaRepository<Waybill, Long> {

    List<Waybill> findALlByIdIsIn(List<Long> ids);

    @Query("FROM Waybill w JOIN w.invoice i ON w.invoice.id = i.id " +
            "WHERE i.clientCompany.id = :clientCompanyId " +
            "AND i.driver.id = :driverId ")
    List<Waybill> findAllByClientCompanyIdAndDriverId(Long clientCompanyId, Long driverId, Pageable pageable);

    @Query("SELECT count(w) FROM Waybill w JOIN w.invoice i ON w.invoice.id = i.id " +
            "WHERE i.clientCompany.id = :clientCompanyId " +
            "AND i.driver.id = :driverId")
    Long countAllByClientCompanyIdAndDriverId(Long clientCompanyId, Long driverId);

    @Query("SELECT count(w) FROM Waybill w JOIN w.invoice i ON w.invoice.id = i.id " +
            "WHERE i.clientCompany.id = :clientCompanyId " +
            "AND i.registrationUser.id = :registrationUserId")
    Long countAllByClientCompanyIdAndRegistrationUserId(Long clientCompanyId, Long registrationUserId);

    @Query("FROM Waybill w JOIN w.invoice i ON w.invoice.id = i.id " +
            "WHERE i.clientCompany.id = :clientCompanyId " +
            "AND i.checkingUser.id = :registrationUserId ")
    List<Waybill> findAllByClientCompanyIdAndRegistrationUserId(Long clientCompanyId, Long registrationUserId, Pageable pageable);

    @Query("SELECT w FROM Waybill w JOIN w.invoice i ON w.invoice.id = i.id " +
            "WHERE i.clientCompany.id = :clientCompanyId " +
            "AND i.driver.id = :driverId " +
            "AND w.status = 'CURRENT'")
    Waybill findByStatusAndDriverIdY(Long driverId, Long clientCompanyId);
}
