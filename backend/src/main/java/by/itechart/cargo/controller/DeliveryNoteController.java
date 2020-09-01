package by.itechart.cargo.controller;

import by.itechart.cargo.model.freight.DeliveryNote;
import by.itechart.cargo.service.DeliveryNoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("vi/api/note")
public class DeliveryNoteController {

    private DeliveryNoteService deliveryNoteService;

    @Autowired
    public DeliveryNoteController(DeliveryNoteService deliveryNoteService) {
        this.deliveryNoteService = deliveryNoteService;
    }


    @GetMapping()
    public List<DeliveryNote> findAll() {
        return deliveryNoteService.findAll();
    }
}
