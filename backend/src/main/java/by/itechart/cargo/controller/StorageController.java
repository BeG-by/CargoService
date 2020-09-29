package by.itechart.cargo.controller;

import by.itechart.cargo.dto.model_dto.storage.StorageSaveRequest;
import by.itechart.cargo.dto.model_dto.storage.StorageUpdateRequest;
import by.itechart.cargo.exception.AlreadyExistException;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.model.Storage;
import by.itechart.cargo.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<List<Storage>> findAll() {
        return ResponseEntity.ok(storageService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Storage> findById(@PathVariable long id) throws NotFoundException {
        return ResponseEntity.ok(storageService.findById(id));
    }

    @PostMapping
    public ResponseEntity<?> findById(@RequestBody StorageSaveRequest request) throws AlreadyExistException {
        storageService.save(request);
        return ResponseEntity.ok("Storage has been saved");
    }

    @PutMapping
    public ResponseEntity<?> update(@RequestBody StorageUpdateRequest request) throws NotFoundException, AlreadyExistException {
        storageService.update(request);
        return ResponseEntity.ok("Storage has been updated");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable long id) throws NotFoundException {
        storageService.delete(id);
        return ResponseEntity.ok("Storage has been deleted");
    }

}
