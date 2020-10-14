package by.itechart.cargo.repository;

import by.itechart.cargo.model.Invoice;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {

    List<Invoice> findAllByClientCompanyIdAndCheckingUserId(Long clientCompanyId, Long checkingUserId, Pageable pageable);

    List<Invoice> findAllByClientCompanyIdAndRegistrationUserId(Long clientCompanyId, Long registrationUserId, Pageable pageable);

    List<Invoice> findAllByClientCompanyIdAndDriverId(Long clientCompanyId, Long driverId, Pageable pageable);

    List<Invoice> findAllByClientCompanyId(Long clientCompanyId, Pageable pageable);

    List<Invoice> findAllByIdIsIn(List<Long> ids);

    Optional<Invoice> findByIdAndClientCompanyId(Long id, Long clientCompanyId);

    Long countAllByClientCompanyId(Long clientCompanyId);

    Long countAllByClientCompanyIdAndDriverId(Long clientCompanyId, Long checkingUserId);

    Long countAllByClientCompanyIdAndCheckingUserId(Long clientCompanyId, Long checkingUserId);

    Long countAllByClientCompanyIdAndRegistrationUserId(Long clientCompanyId, Long registrationUserId);

    Optional<Invoice> findByNumber(String number);
}
