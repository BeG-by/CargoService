package by.itechart.cargo.repository;

import by.itechart.cargo.model.ClientCompany;
import by.itechart.cargo.model.freight.Waybill;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface WaybillRepository extends JpaRepository<Waybill, Long> {

    List<Waybill> findByClientCompany(ClientCompany clientCompany);

}
