package by.itechart.cargo.repository;

import by.itechart.cargo.model.ResetPasswordDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ResetPasswordDetailsRepository extends JpaRepository<ResetPasswordDetails, Long> {

    Optional<ResetPasswordDetails> findByActivationCode(String code);

    Optional<ResetPasswordDetails> findByEmail(String email);
}
