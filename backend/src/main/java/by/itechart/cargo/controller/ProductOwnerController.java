package by.itechart.cargo.controller;

import by.itechart.cargo.dto.model_dto.product_owner.ProductOwnerPaginationResponse;
import by.itechart.cargo.dto.model_dto.product_owner.ProductOwnerSaveRequest;
import by.itechart.cargo.dto.model_dto.product_owner.ProductOwnerUpdateRequest;
import by.itechart.cargo.exception.AlreadyExistException;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.model.ProductOwner;
import by.itechart.cargo.service.ProductOwnerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static by.itechart.cargo.security.RoleConstant.*;
import static by.itechart.cargo.security.RoleConstant.MANAGER;

@RestController
@RequestMapping("/v1/api/owners")
@Slf4j
public class ProductOwnerController {

    private final ProductOwnerService productOwnerService;

    @Autowired
    public ProductOwnerController(ProductOwnerService productOwnerService) {
        this.productOwnerService = productOwnerService;
    }

    @GetMapping
    @Secured({OWNER, DISPATCHER, MANAGER})
    public ResponseEntity<ProductOwnerPaginationResponse> productOwners(@RequestParam int requestedPage,
                                                                        @RequestParam int productOwnersPerPage) {
        return ResponseEntity.ok(productOwnerService.findWithPagination(requestedPage, productOwnersPerPage));
    }

    @GetMapping("/{id}")
    @Secured({OWNER, DISPATCHER, MANAGER})
    public ResponseEntity<ProductOwner> productOwner(@PathVariable Long id) throws NotFoundException {
        return ResponseEntity.ok(productOwnerService.findById(id));
    }

    @GetMapping("/filter")
    @Secured({OWNER, DISPATCHER, MANAGER})
    public ResponseEntity<ProductOwnerPaginationResponse> findByNameWithPagination(@RequestParam String name,
                                                                                   @RequestParam int requestedPage,
                                                                                   @RequestParam int productOwnersPerPage) {
        return ResponseEntity.ok(productOwnerService.findByName(name, requestedPage, productOwnersPerPage));
    }

    @PutMapping
    @Secured({OWNER, DISPATCHER, MANAGER})
    public ResponseEntity<String> update(@RequestBody @Valid ProductOwnerUpdateRequest productOwnerUpdateRequest) throws
            NotFoundException, AlreadyExistException {
        productOwnerService.update(productOwnerUpdateRequest);
        return ResponseEntity.ok("Product owner has been updated");
    }

    @DeleteMapping("/{id}")
    @Secured({OWNER, DISPATCHER, MANAGER})
    public ResponseEntity<String> delete(@PathVariable Long id) throws NotFoundException {
        productOwnerService.delete(id);
        return ResponseEntity.ok("Product owner has been deleted");
    }

    @PostMapping
    @Secured({OWNER, DISPATCHER, MANAGER})
    public ResponseEntity<String> save(@RequestBody @Valid ProductOwnerSaveRequest productOwner) throws
            NotFoundException, AlreadyExistException {
        productOwnerService.save(productOwner);
        return ResponseEntity.ok("Product owner has been saved");
    }
}
