package by.itechart.cargo.controller;

import by.itechart.cargo.dto.model_dto.storage.StoragePaginationResponse;
import by.itechart.cargo.dto.model_dto.storage.StorageSaveRequest;
import by.itechart.cargo.dto.model_dto.storage.StorageUpdateRequest;
import by.itechart.cargo.exception.AlreadyExistException;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.model.Storage;
import by.itechart.cargo.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import static by.itechart.cargo.security.RoleConstant.*;

@RestController
@RequestMapping("/v1/api/storages")
@Validated
public class StorageController {

    private final StorageService storageService;

    @Autowired
    public StorageController(StorageService storageService) {
        this.storageService = storageService;
    }

    @GetMapping
    @Secured({ADMIN, OWNER, DISPATCHER, MANAGER})
    public ResponseEntity<StoragePaginationResponse> findAll(@RequestParam int page, @RequestParam int storagesPerPage) {
        return ResponseEntity.ok(storageService.findAll(page, storagesPerPage));
    }

    @GetMapping("/{id}")
    @Secured({ADMIN, OWNER, DISPATCHER, MANAGER})
    public ResponseEntity<Storage> findById(@PathVariable long id) throws NotFoundException {
        return ResponseEntity.ok(storageService.findById(id));
    }

    @PostMapping
    @Secured({ADMIN, OWNER, DISPATCHER})
    public ResponseEntity<String> save(@RequestBody StorageSaveRequest request) throws AlreadyExistException {
        storageService.save(request);
        return ResponseEntity.ok("Storage has been saved");
    }

    @PutMapping
    @Secured({ADMIN, OWNER, DISPATCHER})
    public ResponseEntity<String> update(@RequestBody StorageUpdateRequest request) throws NotFoundException, AlreadyExistException {
        storageService.update(request);
        return ResponseEntity.ok("Storage has been updated");
    }

    @DeleteMapping("/{id}")
    @Secured({ADMIN, OWNER, DISPATCHER})
    public ResponseEntity<String> delete(@PathVariable long id) throws NotFoundException {
        storageService.delete(id);
        return ResponseEntity.ok("Storage has been deleted");
    }

}
