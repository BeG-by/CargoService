package by.itechart.cargo.controller;

import by.itechart.cargo.dto.model_dto.invoice.InvoiceRequest;
import by.itechart.cargo.dto.model_dto.invoice.InvoiceResponse;
import by.itechart.cargo.dto.model_dto.invoice.InvoiceTableResponse;
import by.itechart.cargo.dto.model_dto.invoice.UpdateInvoiceStatusRequest;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.model.freight.Invoice;
import by.itechart.cargo.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/v1/api/invoices")
@Validated
public class InvoiceController {

    private final InvoiceService invoiceService;

    @Autowired
    public InvoiceController(InvoiceService invoiceService) {
        this.invoiceService = invoiceService;
    }

    @GetMapping
    public ResponseEntity<List<InvoiceTableResponse>> findAll() {
        return ResponseEntity.ok(invoiceService.findAllTableData());
    }

    @GetMapping("/{id}")
    public ResponseEntity<InvoiceResponse> findById(@PathVariable long id) throws NotFoundException {
        return ResponseEntity.ok(invoiceService.findById(id));
    }

    @PostMapping
    public ResponseEntity<String> saveOne(@RequestBody @Valid InvoiceRequest invoiceRequest) {
        invoiceService.saveOne(invoiceRequest);
        return ResponseEntity.ok("Invoice has been saved");
    }

    @PostMapping("/status")
    public ResponseEntity<String> updateStatus(@RequestBody @Valid UpdateInvoiceStatusRequest invoiceRequest) throws NotFoundException {
        invoiceService.updateStatus(invoiceRequest);
        return ResponseEntity.ok("Invoice status has been updated");
    }

}
