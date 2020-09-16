package by.itechart.cargo.controller;

import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.model.freight.Driver;
import by.itechart.cargo.model.freight.Invoice;
import by.itechart.cargo.service.DriverService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/v1/api/drivers")
public class DriverController {

    private final DriverService driverService;

    public DriverController(DriverService driverService) {
        this.driverService = driverService;
    }

    @GetMapping
    public ResponseEntity<List<Driver>> findAll() {
        return ResponseEntity.ok(driverService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Driver> findById(@PathVariable long id) throws NotFoundException {
        return ResponseEntity.ok(driverService.findById(id));
    }

}
