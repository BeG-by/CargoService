package by.itechart.cargo.service;

import by.itechart.cargo.dto.model_dto.PointRequest;
import by.itechart.cargo.model.freight.Point;
import java.util.List;
import java.util.Optional;

public interface PointService {

    List<Point> findAll(long waybillId);

    Optional<Point> findById(long id);

    void saveOne(PointRequest pointRequest);

}
