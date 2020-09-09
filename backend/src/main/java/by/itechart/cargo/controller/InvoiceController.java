package by.itechart.cargo.controller;

import by.itechart.cargo.dto.model_dto.invoice.InvoiceRequest;
import by.itechart.cargo.model.freight.Invoice;
import by.itechart.cargo.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/api/invoices")
public class InvoiceController {

    private final InvoiceService invoiceService;

    @Autowired
    public InvoiceController(InvoiceService invoiceService) {
        this.invoiceService = invoiceService;
    }

    @GetMapping
    public ResponseEntity<List<Invoice>> findAll() {
        return ResponseEntity.ok(invoiceService.findAll());
    }

    @PostMapping
    public ResponseEntity<String> saveOne(@RequestBody InvoiceRequest invoiceRequest) {
        invoiceService.saveOne(invoiceRequest);
        return ResponseEntity.ok("Invoice has been saved");
    }

}
