package by.itechart.cargo.service.impl;

import by.itechart.cargo.dto.model_dto.invoice.InvoiceRequest;
import by.itechart.cargo.dto.model_dto.invoice.InvoiceResponse;
import by.itechart.cargo.dto.model_dto.invoice.InvoiceTableResponse;
import by.itechart.cargo.dto.model_dto.invoice.UpdateInvoiceStatusRequest;
import by.itechart.cargo.exception.AlreadyExistException;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.model.ClientCompany;
import by.itechart.cargo.model.User;
import by.itechart.cargo.model.enumeration.InvoiceStatus;
import by.itechart.cargo.model.enumeration.Status;
import by.itechart.cargo.model.freight.Driver;
import by.itechart.cargo.model.freight.Invoice;
import by.itechart.cargo.repository.ClientCompanyRepository;
import by.itechart.cargo.repository.DriverRepository;
import by.itechart.cargo.repository.InvoiceRepository;
import by.itechart.cargo.repository.UserRepository;
import by.itechart.cargo.security.jwt.JwtTokenUtil;
import by.itechart.cargo.security.jwt.JwtUserDetails;
import by.itechart.cargo.service.InvoiceService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static by.itechart.cargo.service.constant.MessageConstant.INVOICE_NOT_FOUND_MESSAGE;

@Service
@Transactional
@Slf4j
public class InvoiceServiceImpl implements InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final DriverRepository driverRepository;
    private final ClientCompanyRepository clientCompanyRepository;
    private final UserRepository userRepository;
    private final JwtTokenUtil jwtTokenUtil;

    @Autowired
    public InvoiceServiceImpl(InvoiceRepository invoiceRepository,
                              DriverRepository driverRepository,
                              ClientCompanyRepository clientCompanyRepository,
                              UserRepository userRepository,
                              JwtTokenUtil jwtTokenUtil) {

        this.invoiceRepository = invoiceRepository;
        this.driverRepository = driverRepository;
        this.clientCompanyRepository = clientCompanyRepository;
        this.userRepository = userRepository;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @Override
    public List<Invoice> findAll() {
        return invoiceRepository.findByClientCompany(jwtTokenUtil.getJwtUser().getClientCompany());
    }

    @Override
    public List<InvoiceTableResponse> findAllTableData() {
        return findAll().stream()
                .map(invoice -> new InvoiceTableResponse().toInvoiceTableResponse(invoice))
                .collect(Collectors.toList());
    }

    @Override
    public InvoiceResponse findById(long id) throws NotFoundException {
        Invoice invoice = invoiceRepository.findById(id).orElseThrow(() ->
                new NotFoundException(INVOICE_NOT_FOUND_MESSAGE));
        return new InvoiceResponse().toInvoiceResponse(invoice);
    }


    @Override
    public void save(InvoiceRequest invoiceRequest) throws AlreadyExistException, NotFoundException {
        final Invoice invoice = invoiceRequest.toInvoice();

        if (invoiceRepository.findByNumber(invoice.getNumber()).isPresent()) {
            throw new AlreadyExistException(String.format("Invoice with number \"%s\" exists", invoice.getNumber()));
        }

        final JwtUserDetails currentUser = jwtTokenUtil.getJwtUser();
        final Long companyId = currentUser.getClientCompany().getId();
        final Long driverId = invoiceRequest.getDriverId();

        Driver driver = driverRepository
                .findById(driverId)
                .orElseThrow(() -> new NotFoundException(String.format("Driver with id \"%d\" doesn't exists", driverId)));

        invoice.setDriver(driver);

        final ClientCompany clientCompany = clientCompanyRepository.getOne(companyId);
        invoice.setClientCompany(clientCompany);

        final User user = userRepository.getOne(currentUser.getId());
        invoice.setRegistrationUser(user);

        invoice.getProducts().forEach(p -> {
            p.setInvoice(invoice);
            p.setProductStatus(Status.ACCEPTED);
        });

        if (invoiceRequest.getStatus() == null) {
            invoice.setInvoiceStatus(InvoiceStatus.REGISTERED);
        } else {
            invoice.setInvoiceStatus(invoiceRequest.getStatus());
        }

        final Invoice invoiceDb = invoiceRepository.save(invoice);

        log.info("Invoice has been saved {}", invoiceDb);

    }

    @Override
    public void updateInvoice(InvoiceRequest invoiceRequest) throws NotFoundException, AlreadyExistException {
        final JwtUserDetails currentUser = jwtTokenUtil.getJwtUser();
        final Long companyId = currentUser.getClientCompany().getId();
        final Long driverId = invoiceRequest.getDriverId();

        Invoice invoice = invoiceRepository
                .findById(invoiceRequest.getId())
                .orElseThrow(() -> new NotFoundException(INVOICE_NOT_FOUND_MESSAGE));

        Driver driver = driverRepository
                .findById(driverId)
                .orElseThrow(() -> new NotFoundException(String.format("Driver with id \"%d\" doesn't exists", driverId)));

        Optional<Invoice> invoiceByNumber = invoiceRepository.findByNumber(invoiceRequest.getInvoiceNumber());
        if (invoiceByNumber.isPresent() && !invoiceByNumber.get().getId().equals(invoiceRequest.getId())) {
            throw new AlreadyExistException(String.format("Invoice with number \"%s\" exists", invoiceRequest.getInvoiceNumber()));
        }

        invoice.setDriver(driver);

        final ClientCompany clientCompany = clientCompanyRepository.getOne(companyId);
        invoice.setClientCompany(clientCompany);

        final User user = userRepository.getOne(currentUser.getId());
        invoice.setRegistrationUser(user);

        invoice.setNumber(invoiceRequest.getInvoiceNumber());
        if (invoiceRequest.getStatus() == null) {
            invoice.setInvoiceStatus(InvoiceStatus.REGISTERED);
        } else {
            invoice.setInvoiceStatus(invoiceRequest.getStatus());
        }
        invoice.setShipper(invoiceRequest.getShipper());
        invoice.setConsignee(invoiceRequest.getConsignee());

        invoice.getProducts().forEach(p -> p.setInvoice(null));
        invoice.getProducts().clear();
        invoice.getProducts().addAll(invoiceRequest.getProducts());
        invoiceRequest.getProducts().forEach(p -> {
            p.setInvoice(invoice);
            p.setProductStatus(Status.ACCEPTED);
        });

        log.info("Invoice has been updated {}", invoiceRequest);
    }


    @Override
    public void updateStatus(UpdateInvoiceStatusRequest invoiceRequest) throws NotFoundException {
        final Invoice invoice = invoiceRequest.toInvoice();
        Invoice foundInvoice = invoiceRepository.findById(invoice.getId()).orElseThrow(() ->
                new NotFoundException(INVOICE_NOT_FOUND_MESSAGE));
        if (invoice.getInvoiceStatus().equals(InvoiceStatus.ACCEPTED)) {
            foundInvoice.setCheckingDate(LocalDate.now());
            foundInvoice.setCheckingUser(userRepository.getOne(jwtTokenUtil.getJwtUser().getId()));
        }
        foundInvoice.setInvoiceStatus(invoice.getInvoiceStatus());
        Invoice invoiceDb = invoiceRepository.save(foundInvoice);
        log.info("Invoice has been verified {}", invoiceDb);
    }

}
