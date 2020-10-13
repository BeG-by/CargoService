package by.itechart.cargo.repository;

import by.itechart.cargo.model.Role;
import by.itechart.cargo.model.User;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {


    Optional<User> findByEmail(String email);

    @Query("FROM User u WHERE u.clientCompany.id = :clientCompanyId AND u.status <> 'DELETED'")
    List<User> findAllWithoutDeleted(Long clientCompanyId, Sort sort);

    Optional<User> findByIdAndClientCompanyId(Long userId, Long clientCompanyId);

    Optional<User> findByClientCompanyIdAndDriverId(Long clientCompanyId, Long invoiceId);  //todo: refactor (rename on invoice id)

    List<User> findAllByClientCompanyIdAndRoles(Long clientCompanyId, Role role);

    Optional<User> findByIdAndRolesAndClientCompanyId(Long userId, Role role, Long clientCompanyId);

    @Query("FROM User u WHERE u.status <> 'DELETED'")
    List<User> findAllPresent();

}
