package by.itechart.cargo.service.impl;

import by.itechart.cargo.dto.model_dto.invoice.InvoiceRequest;
import by.itechart.cargo.model.ClientCompany;
import by.itechart.cargo.model.User;
import by.itechart.cargo.model.enumeration.Status;
import by.itechart.cargo.model.enumeration.InvoiceStatus;
import by.itechart.cargo.model.freight.Driver;
import by.itechart.cargo.model.freight.Invoice;
import by.itechart.cargo.repository.ClientCompanyRepository;
import by.itechart.cargo.repository.DriverRepository;
import by.itechart.cargo.repository.UserRepository;
import by.itechart.cargo.repository.InvoiceRepository;
import by.itechart.cargo.security.jwt.JwtTokenUtil;
import by.itechart.cargo.security.jwt.JwtUserDetails;
import by.itechart.cargo.service.InvoiceService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

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
    public void saveOne(InvoiceRequest invoiceRequest) {
        final Invoice invoice = invoiceRequest.toWayBill();

        final JwtUserDetails currentUser = jwtTokenUtil.getJwtUser();
        final Long companyId = currentUser.getClientCompany().getId();
        final Long driverId = invoiceRequest.getDriverId();

        final Driver driver = driverRepository.getOne(driverId);
        invoice.setDriver(driver);

        final ClientCompany clientCompany = clientCompanyRepository.getOne(companyId);
        invoice.setClientCompany(clientCompany);

        final User user = userRepository.getOne(currentUser.getId());
        invoice.setRegistrationUser(user);

        invoice.getProducts().forEach(p -> {
            p.setInvoice(invoice);
            p.setProductStatus(Status.ACCEPTED);
        });
        invoice.setInvoiceStatus(InvoiceStatus.REGISTERED);

        final Invoice invoiceDb = invoiceRepository.save(invoice);

        log.info("Invoice has been saved {}", invoiceDb);

    }


}
