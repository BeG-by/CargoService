package by.itechart.cargo.repository;

import by.itechart.cargo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

}
