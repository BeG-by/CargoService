package by.itechart.cargo.repository;

import by.itechart.cargo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByLogin(String login);

    List<User> findByClientCompanyId(Long clientCompanyId);

    Optional<User> getByLogin(String login);

    Optional<User> getByEmail(String email);

}
