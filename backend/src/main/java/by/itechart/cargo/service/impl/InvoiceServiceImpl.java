package by.itechart.cargo.service.impl;

import by.itechart.cargo.dto.model_dto.invoice.*;
import by.itechart.cargo.elasticsearch.model.ElasticsearchInvoice;
import by.itechart.cargo.elasticsearch.repository.ElasticsearchInvoiceRepository;
import by.itechart.cargo.exception.AlreadyExistException;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.model.*;
import by.itechart.cargo.repository.*;
import by.itechart.cargo.security.JwtTokenUtil;
import by.itechart.cargo.security.JwtUserDetails;
import by.itechart.cargo.service.InvoiceService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import static by.itechart.cargo.dto.model_dto.invoice.InvoiceResponse.fromInvoices;
import static by.itechart.cargo.service.constant.MessageConstant.*;

@Service
@Transactional
@Slf4j
public class InvoiceServiceImpl implements InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final ClientCompanyRepository clientCompanyRepository;
    private final UserRepository userRepository;
    private final WaybillRepository waybillRepository;
    private final JwtTokenUtil jwtTokenUtil;
    private final ProductOwnerRepository productOwnerRepository;
    private final RoleRepository roleRepository;
    private final StorageRepository storageRepository;
    private final ElasticsearchInvoiceRepository elasticsearchInvoiceRepository;
    private final ProductRepository productRepository;

    @Autowired
    public InvoiceServiceImpl(InvoiceRepository invoiceRepository,
                              WaybillRepository waybillRepository,
                              ProductOwnerRepository productOwnerRepository,
                              ClientCompanyRepository clientCompanyRepository,
                              UserRepository userRepository,
                              JwtTokenUtil jwtTokenUtil,
                              StorageRepository storageRepository,
                              RoleRepository roleRepository,
                              ElasticsearchInvoiceRepository elasticsearchInvoiceRepository,
                              ProductRepository productRepository) {

        this.invoiceRepository = invoiceRepository;
        this.waybillRepository = waybillRepository;
        this.clientCompanyRepository = clientCompanyRepository;
        this.userRepository = userRepository;
        this.jwtTokenUtil = jwtTokenUtil;
        this.productOwnerRepository = productOwnerRepository;
        this.storageRepository = storageRepository;
        this.roleRepository = roleRepository;
        this.elasticsearchInvoiceRepository = elasticsearchInvoiceRepository;
        this.productRepository = productRepository;
    }

    @Override
    public InvoicePaginationResponse findAll(int requestedPage, int invoicesPerPage) {
        PageRequest pageRequest = PageRequest.of(requestedPage, invoicesPerPage);
        JwtUserDetails jwtUser = jwtTokenUtil.getJwtUser();
        Long clientCompanyId = jwtUser.getClientCompany().getId();

        long amountInvoices = invoiceRepository.countAllByClientCompanyId(clientCompanyId);
        List<Invoice> invoices = invoiceRepository.findAllByClientCompanyId(clientCompanyId, pageRequest);
        return new InvoicePaginationResponse(amountInvoices, fromInvoices(invoices));

    }

    @Override
    public InvoicePaginationResponse findAllForDriver(int requestedPage, int invoicesPerPage) {
        JwtUserDetails jwtUser = jwtTokenUtil.getJwtUser();
        PageRequest pageRequest = PageRequest.of(requestedPage, invoicesPerPage);

        long amountInvoices = invoiceRepository.countAllByClientCompanyIdAndDriverId(jwtUser.getClientCompany().getId(), jwtUser.getId());
        List<Invoice> invoices = invoiceRepository.findAllByClientCompanyIdAndDriverId(jwtUser.getClientCompany().getId(), jwtUser.getId(), pageRequest);
        return new InvoicePaginationResponse(amountInvoices, fromInvoices(invoices));

    }

    @Override
    public InvoicePaginationResponse findAllForManager(int requestedPage, int invoicesPerPage) {
        JwtUserDetails jwtUser = jwtTokenUtil.getJwtUser();
        PageRequest pageRequest = PageRequest.of(requestedPage, invoicesPerPage);

        long amountInvoices = invoiceRepository.countAllByClientCompanyIdAndCheckingUserId(jwtUser.getClientCompany().getId(), jwtUser.getId());
        List<Invoice> invoices = invoiceRepository.findAllByClientCompanyIdAndCheckingUserId(jwtUser.getClientCompany().getId(), jwtUser.getId(), pageRequest);
        return new InvoicePaginationResponse(amountInvoices, fromInvoices(invoices));
    }

    @Override
    public InvoicePaginationResponse findAllForDispatcher(int requestedPage, int invoicesPerPage) {
        JwtUserDetails jwtUser = jwtTokenUtil.getJwtUser();
        PageRequest pageRequest = PageRequest.of(requestedPage, invoicesPerPage);

        long amountInvoices = invoiceRepository.countAllByClientCompanyIdAndRegistrationUserId(jwtUser.getClientCompany().getId(), jwtUser.getId());
        List<Invoice> invoices = invoiceRepository.findAllByClientCompanyIdAndRegistrationUserId(jwtUser.getClientCompany().getId(), jwtUser.getId(), pageRequest);
        return new InvoicePaginationResponse(amountInvoices, fromInvoices(invoices));
    }


    @Override
    public InvoicePaginationResponse findAllByNumberStartsWith(String numberStartStr, int requestedPage, int invoicesPerPage) {
        numberStartStr = numberStartStr.replace(" ", "");
        JwtUserDetails jwtUser = jwtTokenUtil.getJwtUser();
        Long clientCompanyId = jwtUser.getClientCompany().getId();
        PageRequest pageRequest = PageRequest.of(requestedPage, invoicesPerPage);


        List<Long> ids = elasticsearchInvoiceRepository
                .findALlByNumberStartsWithAndClientCompanyId(numberStartStr, clientCompanyId, pageRequest).stream()
                .map(ElasticsearchInvoice::getId)
                .collect(Collectors.toList());

        long totalAmount = elasticsearchInvoiceRepository.countAllByNumberStartsWithAndClientCompanyId(numberStartStr, clientCompanyId);
        List<Invoice> invoices = invoiceRepository.findAllByIdIsIn(ids);

        return new InvoicePaginationResponse(totalAmount, fromInvoices(invoices));
    }

    @Override
    public InvoicePaginationResponse findAllByNumberStartsWithForDriver(String numberStartStr, int requestedPage, int invoicesPerPage) {
        numberStartStr = numberStartStr.replace(" ", "");
        JwtUserDetails jwtUser = jwtTokenUtil.getJwtUser();
        Long clientCompanyId = jwtUser.getClientCompany().getId();
        PageRequest pageRequest = PageRequest.of(requestedPage, invoicesPerPage);

        List<Long> ids = elasticsearchInvoiceRepository
                .findALlByNumberStartsWithAndClientCompanyIdAndDriverId(numberStartStr, clientCompanyId, jwtUser.getId(), pageRequest).stream()
                .map(ElasticsearchInvoice::getId)
                .collect(Collectors.toList());

        Long totalAmount = elasticsearchInvoiceRepository.countAllByNumberStartsWithAndClientCompanyIdAndDriverId(numberStartStr, clientCompanyId, jwtUser.getId());
        List<Invoice> invoices = invoiceRepository.findAllByIdIsIn(ids);
        return new InvoicePaginationResponse(totalAmount, fromInvoices(invoices));
    }

    @Override
    public InvoicePaginationResponse findAllByNumberStartsWithForManager(String numberStartStr, int requestedPage, int invoicesPerPage) {
        numberStartStr = numberStartStr.replace(" ", "");
        JwtUserDetails jwtUser = jwtTokenUtil.getJwtUser();
        Long clientCompanyId = jwtUser.getClientCompany().getId();
        PageRequest pageRequest = PageRequest.of(requestedPage, invoicesPerPage);

        List<Long> ids = elasticsearchInvoiceRepository
                .findALlByNumberStartsWithAndClientCompanyIdAndCheckingUserId(numberStartStr, clientCompanyId, jwtUser.getId(), pageRequest).stream()
                .map(ElasticsearchInvoice::getId)
                .collect(Collectors.toList());

        Long totalAmount = elasticsearchInvoiceRepository.countAllByNumberStartsWithAndClientCompanyIdAndCheckingUserId(numberStartStr, clientCompanyId, jwtUser.getId());
        List<Invoice> invoices = invoiceRepository.findAllByIdIsIn(ids);
        return new InvoicePaginationResponse(totalAmount, fromInvoices(invoices));
    }

    @Override
    public InvoicePaginationResponse findAllByNumberStartsWithForDispatcher(String numberStartStr, int requestedPage, int invoicesPerPage) {
        numberStartStr = numberStartStr.replace(" ", "");
        JwtUserDetails jwtUser = jwtTokenUtil.getJwtUser();
        Long clientCompanyId = jwtUser.getClientCompany().getId();
        PageRequest pageRequest = PageRequest.of(requestedPage, invoicesPerPage);

        List<Long> ids = elasticsearchInvoiceRepository
                .findAllByNumberStartsWithAndClientCompanyIdAndRegistrationUserId(numberStartStr, clientCompanyId, jwtUser.getId(), pageRequest).stream()
                .map(ElasticsearchInvoice::getId)
                .collect(Collectors.toList());

        Long totalAmount = elasticsearchInvoiceRepository.countAllByNumberStartsWithAndClientCompanyIdAndRegistrationUserId(numberStartStr, clientCompanyId, jwtUser.getId());
        List<Invoice> invoices = invoiceRepository.findAllByIdIsIn(ids);
        return new InvoicePaginationResponse(totalAmount, fromInvoices(invoices));
    }

    @Override
    public InvoiceResponse findById(long id) throws NotFoundException {
        Long clientCompanyId = jwtTokenUtil.getJwtUser().getClientCompany().getId();
        return InvoiceResponse.toInvoiceResponse(invoiceRepository.findByIdAndClientCompanyId(id, clientCompanyId));
    }


    @Override
    public Long save(InvoiceRequest invoiceRequest) throws AlreadyExistException, NotFoundException {
        final Invoice invoice = invoiceRequest.toInvoice();

        final JwtUserDetails currentUser = jwtTokenUtil.getJwtUser();
        final Long companyId = currentUser.getClientCompany().getId();
        final Long driverId = invoiceRequest.getDriverId();
        final Long managerId = invoiceRequest.getManagerId();
        final Long productOwnerId = invoiceRequest.getProductOwnerId();

        if (invoiceRepository.findByNumber(invoice.getNumber()).isPresent()) {
            throw new AlreadyExistException(String.format("Invoice with number \"%s\" exists", invoice.getNumber()));
        }

        Storage shipper = storageRepository
                .findByIdAndStatusAndClientCompanyId(invoiceRequest.getShipperId(), Storage.Status.ACTIVE, companyId)
                .orElseThrow(() -> new NotFoundException(SHIPPER_NOT_FOUND_MESSAGE));
        invoice.setShipper(shipper);

        Storage consignee = storageRepository
                .findByIdAndStatusAndClientCompanyId(invoiceRequest.getConsigneeId(), Storage.Status.ACTIVE, companyId)
                .orElseThrow(() -> new NotFoundException(CONSIGNEE_NOT_FOUND_MESSAGE));
        invoice.setConsignee(consignee);

        ProductOwner productOwner = productOwnerRepository
                .findByIdAndClientCompanyIdAndStatus(productOwnerId, companyId, ProductOwner.Status.ACTIVE)
                .orElseThrow(() -> new NotFoundException(PRODUCT_OWNER_NOT_FOUND_MESSAGE));
        invoice.setProductOwner(productOwner);


        User driver = userRepository
                .findByIdAndClientCompanyId(driverId, companyId)
                .orElseThrow(() -> new NotFoundException(DRIVER_NOT_FOUND_MESSAGE));
        invoice.setDriver(driver);


        User manager = userRepository
                .findByIdAndClientCompanyId(managerId, companyId)
                .orElseThrow(() -> new NotFoundException(MANAGER_NOT_FOUND_MESSAGE));
        invoice.setCheckingUser(manager);

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

        final Invoice savedInvoice = invoiceRepository.save(invoice);
        elasticsearchInvoiceRepository.save(ElasticsearchInvoice.fromInvoice(savedInvoice));

        log.info("Invoice has been saved {}", savedInvoice);
        return savedInvoice.getId();
    }

    @Override
    public void updateInvoice(InvoiceRequest invoiceRequest) throws NotFoundException, AlreadyExistException {
        final JwtUserDetails currentUser = jwtTokenUtil.getJwtUser();
        final Long companyId = currentUser.getClientCompany().getId();
        final Long driverId = invoiceRequest.getDriverId();
        final Long managerId = invoiceRequest.getManagerId();

        if (isValidInvoiceNumberForUpdate(invoiceRequest)) {
            throw new AlreadyExistException(String.format("Invoice with number \"%s\" exists", invoiceRequest.getInvoiceNumber()));
        }

        Invoice invoice = invoiceRepository
                .findById(invoiceRequest.getId())
                .orElseThrow(() -> new NotFoundException(INVOICE_NOT_FOUND_MESSAGE));

        User driver = userRepository
                .findByIdAndClientCompanyId(driverId, companyId)
                .orElseThrow(() -> new NotFoundException(DRIVER_NOT_FOUND_MESSAGE));

        User manager = userRepository
                .findByIdAndClientCompanyId(managerId, companyId)
                .orElseThrow(() -> new NotFoundException(MANAGER_NOT_FOUND_MESSAGE));

        invoice.setDriver(driver);
        invoice.setCheckingUser(manager);

        final ClientCompany clientCompany = clientCompanyRepository.getOne(companyId);
        invoice.setClientCompany(clientCompany);

        final User user = userRepository.getOne(currentUser.getId());
        invoice.setRegistrationUser(user);

        Storage shipper = storageRepository
                .findByIdAndStatusAndClientCompanyId(invoiceRequest.getShipperId(), Storage.Status.ACTIVE, companyId)
                .orElseThrow(() -> new NotFoundException(SHIPPER_NOT_FOUND_MESSAGE));
        invoice.setShipper(shipper);

        Storage consignee = storageRepository
                .findByIdAndStatusAndClientCompanyId(invoiceRequest.getConsigneeId(), Storage.Status.ACTIVE, companyId)
                .orElseThrow(() -> new NotFoundException(CONSIGNEE_NOT_FOUND_MESSAGE));
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

        elasticsearchInvoiceRepository.save(ElasticsearchInvoice.fromInvoice(invoice));
        log.info("Invoice has been updated {}", invoiceRequest);
    }

    @Override
    public void updateStatus(UpdateInvoiceStatusRequest invoiceRequest) throws NotFoundException {
        final Invoice invoice = invoiceRequest.toInvoice();
        Invoice foundInvoice = invoiceRepository.findById(invoice.getId()).orElseThrow(() ->
                new NotFoundException(INVOICE_NOT_FOUND_MESSAGE));

        if (invoice.getStatus().equals(Invoice.Status.ACCEPTED)
                || invoice.getStatus().equals(Invoice.Status.REJECTED)) {
            foundInvoice.setCheckingDate(LocalDate.now());

        } else if (invoice.getStatus().equals(Invoice.Status.CLOSED)
                || invoice.getStatus().equals(Invoice.Status.CLOSED_WITH_ACT)) {

            if (invoice.getStatus().equals(Invoice.Status.CLOSED)) {
                List<Product> products = foundInvoice.getProducts();
                products.forEach(p -> {
                    try {
                        Product product = productRepository
                                .findById(p.getId()).orElseThrow(() -> new NotFoundException(PRODUCT_NOT_FOUND_MESSAGE));
                        product.setProductStatus(Product.Status.DELIVERED);
                        product.setComment("Clean delivery");
                    } catch (NotFoundException e) {
                        log.error("Product not found {}", p);
                    }
                });
            }

            foundInvoice.setCloseDate(LocalDate.now());
            Waybill waybill = foundInvoice.getWaybill();
            waybill.setStatus(Waybill.WaybillStatus.DONE);
            Long driverId = foundInvoice.getDriver().getId();
            final JwtUserDetails currentUser = jwtTokenUtil.getJwtUser();
            final Long companyId = currentUser.getClientCompany().getId();
            List<Waybill> waybills = waybillRepository.findAllByStatusAndDriverIdY(driverId, companyId);

            if (waybills.size() > 0) {
                Waybill current = waybills.get(0);
                LocalDate date = LocalDate.now().plusDays(30);
                for (Waybill w : waybills) {
                    if (w.getDepartureDate().isBefore(date)) {
                        date = w.getDepartureDate();
                        current = w;
                    }
                }
                current.setStatus(Waybill.WaybillStatus.CURRENT);
            }
        }
        foundInvoice.setStatus(invoice.getStatus());
        foundInvoice.setComment(invoice.getComment());
        log.info("Invoice status has been updated {}", foundInvoice);
    }

    @Override
    public DataForInvoiceCreating findDataForInvoiceCreating() {
        ClientCompany clientCompany = jwtTokenUtil.getJwtUser().getClientCompany();
        List<Storage> storages = storageRepository.findAllByClientCompanyIdAndStatus(clientCompany.getId(), Storage.Status.ACTIVE);

        Role driverRole = roleRepository.getByRole(Role.RoleType.DRIVER);
        List<User> drivers = userRepository.findAllByClientCompanyIdAndRoles(clientCompany.getId(), driverRole);

        Role managerRole = roleRepository.getByRole(Role.RoleType.MANAGER);
        List<User> managers = userRepository.findAllByClientCompanyIdAndRoles(clientCompany.getId(), managerRole);

        return new DataForInvoiceCreating(drivers, storages, managers);
    }

    private boolean isValidInvoiceNumberForUpdate(InvoiceRequest invoiceRequest) {
        return invoiceRepository
                .findByNumber(invoiceRequest.getInvoiceNumber())
                .filter(invoice -> !invoice.getId().equals(invoiceRequest.getId()))
                .isPresent();
    }
}
