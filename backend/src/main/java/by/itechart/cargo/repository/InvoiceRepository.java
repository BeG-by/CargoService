package by.itechart.cargo.repository;

import by.itechart.cargo.model.ClientCompany;
import by.itechart.cargo.model.freight.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {

    List<Invoice> findByClientCompany(ClientCompany clientCompany);

    Optional<Invoice> findByNumber(String number);
}
