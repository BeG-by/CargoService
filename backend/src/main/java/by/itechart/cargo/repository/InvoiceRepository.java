package by.itechart.cargo.repository;

import by.itechart.cargo.model.ClientCompany;
import by.itechart.cargo.model.freight.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {

    List<Invoice> findByClientCompany(ClientCompany clientCompany);
}
