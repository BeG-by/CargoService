package by.itechart.cargo.repository;

import by.itechart.cargo.model.ClientCompany;
import by.itechart.cargo.model.Auto;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AutoRepository extends JpaRepository<Auto, Long> {

    List<Auto> findAllByClientCompany(ClientCompany clientCompany);
}
