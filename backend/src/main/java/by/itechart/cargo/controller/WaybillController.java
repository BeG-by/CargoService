package by.itechart.cargo.controller;

import by.itechart.cargo.dto.model_dto.waybill.WaybillRequest;
import by.itechart.cargo.model.freight.Waybill;
import by.itechart.cargo.service.WaybillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/v1/api/waybills")
@Validated
public class WaybillController {

    private final WaybillService waybillService;

    @Autowired
    public WaybillController(WaybillService waybillService) {
        this.waybillService = waybillService;
    }

    @GetMapping
    public ResponseEntity<List<Waybill>> findAll() {
        return ResponseEntity.ok(waybillService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Waybill>> findById(@PathVariable(value = "id") long id) {
        return ResponseEntity.ok(waybillService.findById(id));
    }

    @PostMapping
    public ResponseEntity<String> saveOne(@RequestBody @Valid WaybillRequest waybillRequest) {
        waybillService.saveOne(waybillRequest);
        return ResponseEntity.ok("Waybill has been saved");
    }

}
