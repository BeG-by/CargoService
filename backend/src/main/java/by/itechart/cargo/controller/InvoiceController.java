package by.itechart.cargo.controller;

import by.itechart.cargo.dto.model_dto.invoice.DataForInvoiceCreating;
import by.itechart.cargo.dto.model_dto.invoice.InvoicePaginationResponse;
import by.itechart.cargo.dto.model_dto.invoice.InvoiceRequest;
import by.itechart.cargo.dto.model_dto.invoice.InvoiceResponse;
import by.itechart.cargo.dto.model_dto.invoice.UpdateInvoiceStatusRequest;
import by.itechart.cargo.exception.AlreadyExistException;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

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
    public ResponseEntity<InvoicePaginationResponse> findAll(@RequestParam int requestedPage, @RequestParam int invoicesPerPage) {
        return ResponseEntity.ok(invoiceService.findAll(requestedPage, invoicesPerPage));
    }

    @GetMapping("/initial/data")
    public ResponseEntity<DataForInvoiceCreating> findDataForInvoiceCreating() {
        return ResponseEntity.ok(invoiceService.findDataForInvoiceCreating());
    }

    @GetMapping("/driver")
    public ResponseEntity<InvoicePaginationResponse> findInvoicesForDriver(@RequestParam(required = false) String number,
                                                                           @RequestParam int requestedPage,
                                                                           @RequestParam int invoicesPerPage) {
        if (number == null) {
            return ResponseEntity.ok(invoiceService.findAllForDriver(requestedPage, invoicesPerPage));
        } else {
            return ResponseEntity.ok(invoiceService.findAllByNumberStartsWithForDriver(number, requestedPage, invoicesPerPage));
        }
    }

    @GetMapping("/manager")
    public ResponseEntity<InvoicePaginationResponse> findInvoicesForManager(@RequestParam(required = false) String number,
                                                                            @RequestParam int requestedPage,
                                                                            @RequestParam int invoicesPerPage) {
        if (number == null) {
            return ResponseEntity.ok(invoiceService.findAllForManager(requestedPage, invoicesPerPage));
        } else {
            return ResponseEntity.ok(invoiceService.findAllByNumberStartsWithForManager(number, requestedPage, invoicesPerPage));
        }
    }

    @GetMapping("/dispatcher")
    public ResponseEntity<InvoicePaginationResponse> findInvoicesForDispatcher(@RequestParam(required = false) String number,
                                                                               @RequestParam int requestedPage,
                                                                               @RequestParam int invoicesPerPage) {
        if (number == null) {
            return ResponseEntity.ok(invoiceService.findAllForDispatcher(requestedPage, invoicesPerPage));
        } else {
            return ResponseEntity.ok(invoiceService.findAllByNumberStartsWithForDispatcher(number, requestedPage, invoicesPerPage));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<InvoiceResponse> findById(@PathVariable long id) throws NotFoundException {
        InvoiceResponse byId = invoiceService.findById(id);
        return ResponseEntity.ok(byId);
    }

    @PostMapping
    public ResponseEntity<String> save(@RequestBody @Valid InvoiceRequest invoiceRequest) throws AlreadyExistException, NotFoundException {
        invoiceService.save(invoiceRequest);
        return ResponseEntity.ok("Invoice has been saved");
    }

    @PostMapping("/status")
    public ResponseEntity<String> updateStatus(@RequestBody @Valid UpdateInvoiceStatusRequest invoiceRequest) throws NotFoundException {
        invoiceService.updateStatus(invoiceRequest);
        return ResponseEntity.ok("Invoice status has been updated");
    }

    @PutMapping
    public ResponseEntity<String> update(@RequestBody @Valid InvoiceRequest invoiceRequest) throws NotFoundException, AlreadyExistException {
        invoiceService.updateInvoice(invoiceRequest);
        return ResponseEntity.ok("Invoice status has been updated");
    }
}
