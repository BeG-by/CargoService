package by.itechart.cargo.repository;

import by.itechart.cargo.model.Invoice;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {

    List<Invoice> findAllByClientCompanyIdAndCheckingUserId(Long clientCompanyId, Long checkingUserId, Pageable pageable);

    List<Invoice> findAllByClientCompanyIdAndRegistrationUserId(Long clientCompanyId, Long registrationUserId, Pageable pageable);

    List<Invoice> findAllByIdIsIn(List<Long> ids);

    Invoice findByIdAndClientCompanyId(Long id, Long clientCompanyId);

    Invoice findByIdAndCheckingUserId(Long id, Long checkingUserId);

    Long countAllByClientCompanyIdAndCheckingUserId(Long clientCompanyId, Long checkingUserId);

    Long countAllByClientCompanyIdAndRegistrationUserId(Long clientCompanyId, Long registrationUserId);
}
