package by.itechart.cargo.controller;

import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.model.freight.Auto;
import by.itechart.cargo.service.AutoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/v1/api/autos")
public class AutoController {

    private final AutoService autoService;

    public AutoController(AutoService autoService) {
        this.autoService = autoService;
    }

    @GetMapping
    public ResponseEntity<List<Auto>> findAll() {
        return ResponseEntity.ok(autoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Auto> findById(@PathVariable long id) throws NotFoundException {
        return ResponseEntity.ok(autoService.findById(id));
    }

}
