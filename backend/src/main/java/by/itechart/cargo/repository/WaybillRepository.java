package by.itechart.cargo.repository;

import by.itechart.cargo.model.ClientCompany;
import by.itechart.cargo.model.Waybill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface WaybillRepository extends JpaRepository<Waybill, Long> {

    List<Waybill> findByClientCompany(ClientCompany clientCompany);

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
