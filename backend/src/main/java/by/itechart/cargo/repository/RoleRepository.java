package by.itechart.cargo.repository;

import by.itechart.cargo.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Role getByRole(Role.RoleType role);

}
