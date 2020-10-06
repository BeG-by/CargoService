package by.itechart.cargo.controller;

import by.itechart.cargo.dto.model_dto.waybill.UpdatePointsRequest;
import by.itechart.cargo.dto.model_dto.waybill.WaybillRequest;
import by.itechart.cargo.dto.model_dto.waybill.WaybillTableResponse;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.model.Point;
import by.itechart.cargo.model.Waybill;
import by.itechart.cargo.service.PointService;
import by.itechart.cargo.service.WaybillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/v1/api/waybills")
@Validated
public class WaybillController {

    private final WaybillService waybillService;
    private final PointService pointService;

    @Autowired
    public WaybillController(WaybillService waybillService, PointService pointService) {
        this.waybillService = waybillService;
        this.pointService = pointService;
    }

    @GetMapping
    public ResponseEntity<List<WaybillTableResponse>> findAll() {
        return ResponseEntity.ok(waybillService.findAllTableData());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Waybill> findById(@PathVariable long id) throws NotFoundException {
        return ResponseEntity.ok(waybillService.findById(id));
    }

    @GetMapping("/points/{id}")
    public ResponseEntity<Point> findPointById(@PathVariable long id) throws NotFoundException {
        return ResponseEntity.ok(pointService.findById(id));
    }

    @PutMapping("/points") // TODO
    public ResponseEntity<String> updatePoints(@RequestBody @Valid UpdatePointsRequest request)
            throws NotFoundException {
        pointService.updatePoint(request);
        return ResponseEntity.ok("Point has been passed");
    }

    @PostMapping
    public ResponseEntity<String> save(@RequestBody @Valid WaybillRequest waybillRequest)
            throws NotFoundException {
        waybillService.save(waybillRequest);
        return ResponseEntity.ok("Waybill has been saved");
    }

}
