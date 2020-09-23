package by.itechart.cargo.service;

import by.itechart.cargo.dto.model_dto.waybill.UpdatePointsRequest;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.model.freight.Point;

public interface PointService {

    Point findById(long id) throws NotFoundException;

    void updatePoint(UpdatePointsRequest request) throws NotFoundException;

}
