package by.itechart.cargo.controller;

import by.itechart.cargo.dto.model_dto.user.UserResponse;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.service.DriverService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static by.itechart.cargo.security.RoleConstant.*;
import static by.itechart.cargo.security.RoleConstant.DISPATCHER;

@RestController
@RequestMapping("/v1/api/drivers")
public class DriverController {

    private final DriverService driverService;

    public DriverController(DriverService driverService) {
        this.driverService = driverService;
    }

    @GetMapping
    public ResponseEntity<List<UserResponse>> findAll() {
        return ResponseEntity.ok(driverService.findAll());
    }

    @GetMapping("/{id}")
    @Secured({OWNER, MANAGER, DRIVER, DISPATCHER})
    public ResponseEntity<UserResponse> findById(@PathVariable long id) throws NotFoundException {
        return ResponseEntity.ok(driverService.findById(id));
    }

}
