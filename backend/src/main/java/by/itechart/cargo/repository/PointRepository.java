package by.itechart.cargo.repository;

import by.itechart.cargo.model.Point;
import by.itechart.cargo.model.Waybill;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PointRepository extends JpaRepository<Point, Long> {

    List<Point> findByWaybill(Waybill waybill);

}
