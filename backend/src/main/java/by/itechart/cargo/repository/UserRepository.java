package by.itechart.cargo.repository;

import by.itechart.cargo.model.Role;
import by.itechart.cargo.model.User;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByLogin(String login);

    Optional<User> findByEmail(String email);

    @Query("FROM User u WHERE u.clientCompany.id = :clientCompanyId AND u.status <> 'DELETED'")
    List<User> findAllWithoutDeleted(Long clientCompanyId , Sort sort);

    List<User> findAllByClientCompanyId(Long clientCompanyId);

    Optional<User> findByIdAndClientCompanyId(Long userId, Long clientCompanyId);

    List<User> findAllByClientCompanyIdAndRoles(Long clientCompanyId, Role role);

    Optional<User> findByIdAndRolesAndClientCompanyId(Long userId, Role role, Long clientCompanyId);

//    @Query(value = "FROM DepositDetail d WHERE d.startDate > :firstDate AND d.startDate < :secondDate")
//    List<DepositDetail> findAllByCreateDate(@Param("firstDate") LocalDateTime firstDate, @Param("secondDate") LocalDateTime secondDate, Sort sort);

}
