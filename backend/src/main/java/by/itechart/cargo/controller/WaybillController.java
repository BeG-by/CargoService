package by.itechart.cargo.controller;

import by.itechart.cargo.dto.model_dto.WaybillRequest;
import by.itechart.cargo.model.freight.Waybill;
import by.itechart.cargo.service.WaybillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/api/waybills")
public class WaybillController {

    private WaybillService waybillService;

    @Autowired
    public WaybillController(WaybillService waybillService) {
        this.waybillService = waybillService;
    }

    @GetMapping
    public ResponseEntity<List<Waybill>> findAll() {
        return ResponseEntity.ok(waybillService.findAll());
    }

    @PostMapping
    public ResponseEntity<String> saveOne(@RequestBody WaybillRequest waybillRequest) {
        System.out.println(waybillRequest);
//        deliveryNoteService.saveOne(deliveryNote);
        return ResponseEntity.ok("Delivery note has been saved");
    }

}
