package by.itechart.cargo.service.impl;

import by.itechart.cargo.dto.model_dto.DriversAndStoragesDTO;
import by.itechart.cargo.dto.model_dto.invoice.InvoiceRequest;
import by.itechart.cargo.dto.model_dto.invoice.InvoiceResponse;
import by.itechart.cargo.dto.model_dto.invoice.InvoiceTableResponse;
import by.itechart.cargo.dto.model_dto.invoice.UpdateInvoiceStatusRequest;
import by.itechart.cargo.exception.AlreadyExistException;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.model.*;
import by.itechart.cargo.repository.*;
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
    private final ClientCompanyRepository clientCompanyRepository;
    private final UserRepository userRepository;
    private final JwtTokenUtil jwtTokenUtil;
    private final ProductOwnerRepository productOwnerRepository;
    private final RoleRepository roleRepository;
    private final StorageRepository storageRepository;

    @Autowired
    public InvoiceServiceImpl(InvoiceRepository invoiceRepository,
                              ProductOwnerRepository productOwnerRepository,
                              ClientCompanyRepository clientCompanyRepository,
                              UserRepository userRepository,
                              JwtTokenUtil jwtTokenUtil,
                              StorageRepository storageRepository,
                              RoleRepository roleRepository) {

        this.invoiceRepository = invoiceRepository;
        this.clientCompanyRepository = clientCompanyRepository;
        this.userRepository = userRepository;
        this.jwtTokenUtil = jwtTokenUtil;
        this.productOwnerRepository = productOwnerRepository;
        this.storageRepository = storageRepository;
        this.roleRepository = roleRepository;
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
        final Long productOwnerId = invoiceRequest.getProductOwnerId();

        Storage shipper = storageRepository
                .findByIdAndStatusAndClientCompanyId(invoiceRequest.getShipperId(), Storage.Status.ACTIVE, companyId)
                .orElseThrow(() -> new NotFoundException("Shipper with doesn't exists"));
        invoice.setShipper(shipper);

        Storage consignee = storageRepository
                .findByIdAndStatusAndClientCompanyId(invoiceRequest.getConsigneeId(), Storage.Status.ACTIVE, companyId)
                .orElseThrow(() -> new NotFoundException("Consignee with doesn't exists"));
        invoice.setConsignee(consignee);


        ProductOwner productOwner = productOwnerRepository
                .findById(productOwnerId)
                .orElseThrow(() -> new NotFoundException(String.format("Driver with id \"%d\" doesn't exists", driverId)));
        invoice.setProductOwner(productOwner);

        User driver = userRepository
                .findById(driverId)
                .orElseThrow(() -> new NotFoundException(String.format("Driver with id \"%d\" doesn't exists", driverId)));


        invoice.setDriver(driver);

        final ClientCompany clientCompany = clientCompanyRepository.getOne(companyId);
        invoice.setClientCompany(clientCompany);

        final User user = userRepository.getOne(currentUser.getId());
        invoice.setRegistrationUser(user);

        invoice.getProducts().forEach(p -> {
            p.setInvoice(invoice);
            p.setProductStatus(Product.Status.ACCEPTED);
        });

        if (invoiceRequest.getStatus() == null) {
            invoice.setStatus(Invoice.Status.REGISTERED);
        } else {
            invoice.setStatus(invoiceRequest.getStatus());
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

        User driver = userRepository
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

        Storage shipper = storageRepository
                .findByIdAndStatusAndClientCompanyId(invoiceRequest.getShipperId(), Storage.Status.ACTIVE, companyId)
                .orElseThrow(() -> new NotFoundException("Shipper with doesn't exists"));
        invoice.setShipper(shipper);

        Storage consignee = storageRepository
                .findByIdAndStatusAndClientCompanyId(invoiceRequest.getConsigneeId(), Storage.Status.ACTIVE, companyId)
                .orElseThrow(() -> new NotFoundException("Consignee with doesn't exists"));
        invoice.setConsignee(consignee);

        invoice.setNumber(invoiceRequest.getInvoiceNumber());
        if (invoiceRequest.getStatus() == null) {
            invoice.setStatus(Invoice.Status.REGISTERED);
        } else {
            invoice.setStatus(invoiceRequest.getStatus());
        }

        invoice.getProducts().forEach(p -> p.setInvoice(null));
        invoice.getProducts().clear();
        invoice.getProducts().addAll(invoiceRequest.getProducts());
        invoiceRequest.getProducts().forEach(p -> {
            p.setInvoice(invoice);
            p.setProductStatus(Product.Status.ACCEPTED);
        });
        log.info("Invoice has been updated {}", invoiceRequest);
    }

    @Override
    public void updateStatus(UpdateInvoiceStatusRequest invoiceRequest) throws NotFoundException {
        final Invoice invoice = invoiceRequest.toInvoice();
        Invoice foundInvoice = invoiceRepository.findById(invoice.getId()).orElseThrow(() ->
                new NotFoundException(INVOICE_NOT_FOUND_MESSAGE));
        if (invoice.getStatus().equals(Invoice.Status.ACCEPTED)) {
            foundInvoice.setCheckingDate(LocalDate.now());
            foundInvoice.setCheckingUser(userRepository.getOne(jwtTokenUtil.getJwtUser().getId()));
        } else if (invoice.getStatus().equals(Invoice.Status.CLOSED)
                || invoice.getStatus().equals(Invoice.Status.CLOSED_WITH_ACT)) {
            foundInvoice.setCloseDate(LocalDate.now());
        }
        foundInvoice.setStatus(invoice.getStatus());
        foundInvoice.setComment(invoice.getComment());
        log.info("Invoice status has been updated {}", foundInvoice);
    }

    @Override
    public DriversAndStoragesDTO findDataForInvoiceCreating() {
        ClientCompany clientCompany = jwtTokenUtil.getJwtUser().getClientCompany();
        List<Storage> storages = storageRepository.findAllWithoutDeleted(clientCompany.getId());
        Role driverRole = roleRepository.getByRole(Role.RoleType.DRIVER);
        List<User> drivers = userRepository.findAllByClientCompanyIdAndRoles(clientCompany.getId(), driverRole);
        return new DriversAndStoragesDTO(drivers, storages);
    }

}
