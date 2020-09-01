package by.itechart.cargo.repository;

import by.itechart.cargo.model.freight.DeliveryNote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeliveryNoteRepository extends JpaRepository<DeliveryNote, Long> {
}
