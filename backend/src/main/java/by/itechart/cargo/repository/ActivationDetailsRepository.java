package by.itechart.cargo.repository;

import by.itechart.cargo.model.ActivationDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ActivationDetailsRepository extends JpaRepository<ActivationDetails, Long> {

    Optional<ActivationDetails> findByEmail(String email);

    Optional<ActivationDetails> findByActivationCode(String code);

}
