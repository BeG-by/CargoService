package by.itechart.cargo.service.impl;

import by.itechart.cargo.dto.PointRequest;
import by.itechart.cargo.model.freight.Point;
import by.itechart.cargo.model.freight.Waybill;
import by.itechart.cargo.repository.*;
import by.itechart.cargo.service.PointService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@Slf4j
public class PointServiceImpl implements PointService {

    private final WaybillRepository waybillRepository;
    private final PointRepository pointRepository;

    @Autowired
    public PointServiceImpl(WaybillRepository waybillRepository,
                            PointRepository pointRepository) {
        this.waybillRepository = waybillRepository;
        this.pointRepository = pointRepository;
    }

    @Override
    public List<Point> findAll(long waybillId) {
        Waybill waybill = waybillRepository.getOne(waybillId);
        return pointRepository.findByWaybill(waybill);
    }

    @Override
    public Optional<Point> findById(long id) {
        return pointRepository.findById(id);
    }

    @Override
    public void saveOne(PointRequest pointRequest) {
        final Point point = pointRequest.toPoint();
        final Long waybillId = pointRequest.getWaybillId();
        final Waybill waybill = waybillRepository.getOne(waybillId);
        point.setWaybill(waybill);
        final Point pointDb = pointRepository.save(point);
        log.info("Point has been added {}", pointDb);
    }

}
