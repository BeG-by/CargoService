package by.itechart.cargo.controller;

import by.itechart.cargo.dto.model_dto.user.UserResponse;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.service.DriverService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/v1/api/drivers")
public class DriverControler {

    private final DriverService driverService;

    public DriverControler(DriverService driverService) {
        this.driverService = driverService;
    }

    @GetMapping
    public ResponseEntity<List<UserResponse>> findAll() {
        return ResponseEntity.ok(driverService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> findById(@PathVariable long id) throws NotFoundException {
        return ResponseEntity.ok(driverService.findById(id));
    }
}
