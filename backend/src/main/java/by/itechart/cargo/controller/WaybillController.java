package by.itechart.cargo.controller;

import by.itechart.cargo.dto.model_dto.user.UserResponse;
import by.itechart.cargo.dto.model_dto.waybill.UpdatePointsRequest;
import by.itechart.cargo.dto.model_dto.waybill.WaybillPaginationResponse;
import by.itechart.cargo.dto.model_dto.waybill.WaybillRequest;
import by.itechart.cargo.dto.model_dto.waybill.WaybillUpdateDateRequest;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.model.Point;
import by.itechart.cargo.model.Waybill;
import by.itechart.cargo.service.PointService;
import by.itechart.cargo.service.UserService;
import by.itechart.cargo.service.WaybillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.util.List;

import static by.itechart.cargo.security.RoleConstant.*;

@RestController
@RequestMapping("/v1/api/waybills")
@Validated
public class WaybillController {

    private final WaybillService waybillService;
    private final PointService pointService;
    private final NotificationController notificationController;
    private final UserService userService;

    @Autowired
    public WaybillController(WaybillService waybillService, PointService pointService, NotificationController notificationController, UserService userService) {
        this.waybillService = waybillService;
        this.pointService = pointService;
        this.notificationController = notificationController;
        this.userService = userService;
    }

    @GetMapping
    @Secured({OWNER, MANAGER, DRIVER})
    public ResponseEntity<WaybillPaginationResponse> findAll(
            @RequestParam(required = false) String invoiceNumber,
            @RequestParam Integer page,
            @RequestParam Integer waybillsPerPage) {
        if (invoiceNumber == null) {
            return ResponseEntity.ok(waybillService.findAll(page, waybillsPerPage));
        } else {
            return ResponseEntity.ok(waybillService.findAllByInvoiceNumber(invoiceNumber, page, waybillsPerPage));
        }
    }


    @GetMapping("/manager")
    @Secured({OWNER, MANAGER, DRIVER})
    public ResponseEntity<WaybillPaginationResponse> findWaybillsForManager(
            @RequestParam(required = false) String invoiceNumber,
            @RequestParam Integer page,
            @RequestParam Integer waybillsPerPage) {
        if (invoiceNumber == null) {
            return ResponseEntity.ok(waybillService.findAllByRegistrationUser(page, waybillsPerPage));
        } else {
            return ResponseEntity.ok(waybillService.findAllByRegistrationUserAndInvoiceNumber(invoiceNumber, page, waybillsPerPage));
        }
    }

    @GetMapping("/driver")
    @Secured({OWNER, MANAGER, DRIVER})
    public ResponseEntity<WaybillPaginationResponse> findWaybillsForDriver(
            @RequestParam(required = false) String invoiceNumber,
            @RequestParam Integer page,
            @RequestParam Integer waybillsPerPage) {
        if (invoiceNumber == null) {
            return ResponseEntity.ok(waybillService.findAllByDriver(page, waybillsPerPage));
        } else {
            return ResponseEntity.ok(waybillService.findAllByDriverAndInvoiceNumber(invoiceNumber, page, waybillsPerPage));
        }
    }

    @GetMapping("/current")
    @Secured({OWNER, MANAGER, DRIVER})
    public ResponseEntity<Waybill> findCurrent() {
        return ResponseEntity.ok(waybillService.findByStatusAndDriverId());
    }


    @GetMapping("/{id}")
    @Secured({OWNER, MANAGER, DRIVER, DISPATCHER})
    public ResponseEntity<Waybill> findById(@PathVariable long id) throws NotFoundException {
        return ResponseEntity.ok(waybillService.findById(id));
    }

    @GetMapping("/points/{id}")
    @Secured({OWNER, MANAGER, DRIVER, DISPATCHER})
    public ResponseEntity<Point> findPointById(@PathVariable long id) throws NotFoundException {
        return ResponseEntity.ok(pointService.findById(id));
    }

    @PutMapping("/points")
    @Secured({OWNER, MANAGER, DRIVER, DISPATCHER})
    public ResponseEntity<String> updatePoints(@RequestBody @Valid UpdatePointsRequest request) throws NotFoundException {
        pointService.updatePoint(request);
        notificationController.notifyAboutPointPass(request.getId());
        return ResponseEntity.ok("Point has been passed");
    }

    @PostMapping
    @Secured({OWNER, MANAGER})
    public ResponseEntity<String> save(@RequestBody @Valid WaybillRequest waybillRequest) throws NotFoundException {
        Long waybillId = waybillService.save(waybillRequest);
        UserResponse driver = userService.findDriverByInvoiceId(waybillRequest.getInvoiceId());
        notificationController.notifyAboutNewWaybill(waybillId, driver.getId());
        return ResponseEntity.ok("Waybill has been saved");
    }

    @PutMapping
    @Secured({MANAGER})
    public ResponseEntity<String> updateDate(@RequestBody List<@Valid WaybillUpdateDateRequest> waybillUpdateDateRequests) throws NotFoundException {
        waybillService.updateDates(waybillUpdateDateRequests);
        return ResponseEntity.ok("Waybill's dates has been updated");

    }

}
