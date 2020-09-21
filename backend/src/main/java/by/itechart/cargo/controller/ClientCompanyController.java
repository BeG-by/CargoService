package by.itechart.cargo.controller;

import by.itechart.cargo.dto.model_dto.client_company.ClientCompanyDTO;
import by.itechart.cargo.exception.AlreadyExistException;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.model.ClientCompany;
import by.itechart.cargo.service.ClientCompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/v1/api/clients")
@Validated
public class ClientCompanyController {

    private final ClientCompanyService clientCompanyService;

    @Autowired
    public ClientCompanyController(ClientCompanyService clientCompanyService) {
        this.clientCompanyService = clientCompanyService;
    }

    @GetMapping
    public ResponseEntity<List<ClientCompany>> findAll() {
        return ResponseEntity.ok(clientCompanyService.findAll());
    }

    @PutMapping
    public ResponseEntity<String> update(@RequestBody @Valid ClientCompanyDTO companyRequest) throws NotFoundException, AlreadyExistException {
        clientCompanyService.update(companyRequest);
        return ResponseEntity.ok("Client company has been updated");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) throws NotFoundException {
        clientCompanyService.delete(id);
        return ResponseEntity.ok("Client company has been deleted");
    }


    @GetMapping("/{id}")
    public ResponseEntity<ClientCompany> findById(@PathVariable Long id) throws NotFoundException {
        return ResponseEntity.ok(clientCompanyService.findById(id));
    }

    @PostMapping
    public ResponseEntity<String> save(@RequestBody @Valid ClientCompanyDTO companyRequest) throws AlreadyExistException {
        clientCompanyService.saveOne(companyRequest);
        return ResponseEntity.ok("Client company has been saved");
    }

}
