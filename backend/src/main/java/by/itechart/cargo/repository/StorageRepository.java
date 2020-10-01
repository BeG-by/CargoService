package by.itechart.cargo.repository;

import by.itechart.cargo.model.Storage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface StorageRepository extends JpaRepository<Storage, Long> {

    @Query("FROM Storage s WHERE s.clientCompany.id = :clientCompanyId AND s.status <> 'DELETED'")
    List<Storage> findAllWithoutDeleted(Long clientCompanyId);

    Optional<Storage> findByIdAndClientCompanyId(Long storageId, Long clientCompany);

    Optional<Storage> findByEmailAndClientCompanyId(String email, Long clientCompany);

}
