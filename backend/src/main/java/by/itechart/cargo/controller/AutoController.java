package by.itechart.cargo.controller;

import by.itechart.cargo.dto.model_dto.auto.AutoPaginationResponse;
import by.itechart.cargo.dto.model_dto.auto.AutoSaveRequest;
import by.itechart.cargo.dto.model_dto.auto.AutoUpdateRequest;
import by.itechart.cargo.exception.AlreadyExistException;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.model.Auto;
import by.itechart.cargo.service.AutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import static by.itechart.cargo.security.RoleConstant.*;

@RestController
@RequestMapping("/v1/api/autos")
@Validated
public class AutoController {

    private final AutoService autoService;

    @Autowired
    public AutoController(AutoService autoService) {
        this.autoService = autoService;
    }

    @GetMapping
    @Secured({ADMIN, OWNER, DRIVER, DISPATCHER, MANAGER})
    public ResponseEntity<AutoPaginationResponse> findAll(@RequestParam int page, int autoPerPage) {
        return ResponseEntity.ok(autoService.findAll(page, autoPerPage));
    }

    @GetMapping("/{id}")
    @Secured({ADMIN, OWNER, DRIVER, DISPATCHER, MANAGER})
    public ResponseEntity<Auto> findById(@PathVariable long id) throws NotFoundException {
        return ResponseEntity.ok(autoService.findById(id));
    }

    @PostMapping
    @Secured({ADMIN, OWNER, DISPATCHER})
    public ResponseEntity<String> save(@RequestBody AutoSaveRequest request) throws AlreadyExistException {
        autoService.save(request);
        return ResponseEntity.ok("Auto has been saved");
    }

    @PutMapping
    @Secured({ADMIN, OWNER, DISPATCHER})
    public ResponseEntity<String> update(@RequestBody AutoUpdateRequest request) throws AlreadyExistException, NotFoundException {
        autoService.update(request);
        return ResponseEntity.ok("Auto has been updated");
    }

    @DeleteMapping("/{id}")
    @Secured({ADMIN, OWNER, DISPATCHER})
    public ResponseEntity<String> delete(@PathVariable long id) throws NotFoundException {
        autoService.delete(id);
        return ResponseEntity.ok("Auto has been deleted");
    }

}
