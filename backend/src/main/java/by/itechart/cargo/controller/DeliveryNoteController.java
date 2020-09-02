package by.itechart.cargo.controller;

import by.itechart.cargo.dto.model_dto.DeliveryNoteRequest;
import by.itechart.cargo.model.freight.DeliveryNote;
import by.itechart.cargo.service.DeliveryNoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/api/notes")
public class DeliveryNoteController {

    private DeliveryNoteService deliveryNoteService;

    @Autowired
    public DeliveryNoteController(DeliveryNoteService deliveryNoteService) {
        this.deliveryNoteService = deliveryNoteService;
    }

    @GetMapping
    public ResponseEntity<List<DeliveryNote>> findAll() {
        return ResponseEntity.ok(deliveryNoteService.findAll());
    }

    @PostMapping
    public ResponseEntity<String> saveOne(@RequestBody DeliveryNoteRequest deliveryNoteRequest) {
        System.out.println(deliveryNoteRequest);
//        deliveryNoteService.saveOne(deliveryNote);
        return ResponseEntity.ok("Delivery note has been saved");
    }

}
