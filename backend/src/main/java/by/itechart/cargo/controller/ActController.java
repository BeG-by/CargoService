package by.itechart.cargo.controller;

import by.itechart.cargo.dto.model_dto.act.ActRequest;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.model.Act;
import by.itechart.cargo.service.ActService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;

import static by.itechart.cargo.security.RoleConstant.*;
import static by.itechart.cargo.security.RoleConstant.DISPATCHER;

@RestController
@RequestMapping("/v1/api/acts")
@Validated
public class ActController {

    private final ActService actService;

    @Autowired
    public ActController(ActService actService) {
        this.actService = actService;
    }

    @GetMapping("/{id}")
    @Secured({OWNER, MANAGER, DRIVER, DISPATCHER})
    public ResponseEntity<Act> findById(@PathVariable long id) throws NotFoundException {
        return ResponseEntity.ok(actService.findById(id));
    }

    @PostMapping
    @Secured({OWNER, MANAGER, DRIVER})
    public ResponseEntity<String> save(@RequestBody @Valid ActRequest actRequest)
            throws NotFoundException {
        actService.save(actRequest);
        return ResponseEntity.ok("Act has been saved");
    }

}
