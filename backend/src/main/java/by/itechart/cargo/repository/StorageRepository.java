package by.itechart.cargo.repository;

import by.itechart.cargo.model.Storage;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StorageRepository extends JpaRepository<Storage, Long> {

    List<Storage> findAllByClientCompanyIdAndStatus(Long clientCompanyId, Storage.Status status, Pageable pageable);

    List<Storage> findAllByClientCompanyIdAndStatus(Long clientCompanyId, Storage.Status status);

    long countAllByClientCompanyIdAndStatus(Long clientCompanyId, Storage.Status status);

    Optional<Storage> findByIdAndStatusAndClientCompanyId(Long id, Storage.Status status, Long clientCompany);

    Optional<Storage> findByIdAndClientCompanyId(Long storageId, Long clientCompany);

    Optional<Storage> findByEmailAndClientCompanyId(String email, Long clientCompany);

}

