package by.itechart.cargo.service.impl;

import by.itechart.cargo.dto.model_dto.waybill.WaybillRequest;
import by.itechart.cargo.dto.model_dto.waybill.WaybillTableResponse;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.model.ClientCompany;
import by.itechart.cargo.model.freight.Auto;
import by.itechart.cargo.model.freight.Invoice;
import by.itechart.cargo.model.freight.Waybill;
import by.itechart.cargo.repository.AutoRepository;
import by.itechart.cargo.repository.ClientCompanyRepository;
import by.itechart.cargo.repository.InvoiceRepository;
import by.itechart.cargo.repository.WaybillRepository;
import by.itechart.cargo.security.jwt.JwtTokenUtil;
import by.itechart.cargo.security.jwt.JwtUserDetails;
import by.itechart.cargo.service.WaybillService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;
import static by.itechart.cargo.service.constant.MessageConstant.*;

@Service
@Transactional
@Slf4j
public class WaybillServiceImpl implements WaybillService {

    private final ClientCompanyRepository clientCompanyRepository;
    private final WaybillRepository waybillRepository;
    private final AutoRepository autoRepository;
    private final InvoiceRepository invoiceRepository;
    private final JwtTokenUtil jwtTokenUtil;

    @Autowired
    public WaybillServiceImpl(ClientCompanyRepository clientCompanyRepository,
                              WaybillRepository waybillRepository,
                              AutoRepository autoRepository,
                              InvoiceRepository invoiceRepository,
                              JwtTokenUtil jwtTokenUtil) {
        this.clientCompanyRepository = clientCompanyRepository;
        this.waybillRepository = waybillRepository;
        this.autoRepository = autoRepository;
        this.invoiceRepository = invoiceRepository;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @Override
    public List<Waybill> findAll() {
        return waybillRepository.findByClientCompany(jwtTokenUtil.getJwtUser().getClientCompany());
    }

    @Override
    public List<WaybillTableResponse> findAllTableData() {
        return findAll().stream()
                .map(waybill -> new WaybillTableResponse().toWaybillTableResponse(waybill))
                .collect(Collectors.toList());
    }

    @Override
    public Waybill findById(long id) throws NotFoundException {
        return waybillRepository.findById(id).orElseThrow(() -> new NotFoundException(WAYBILL_NOT_FOUND_MESSAGE));
    }

    @Override
    public void save(WaybillRequest waybillRequest) throws NotFoundException {
        final Waybill waybill = waybillRequest.toWaybill();

        final JwtUserDetails currentUser = jwtTokenUtil.getJwtUser();
        final Long companyId = currentUser.getClientCompany().getId();
        final Long invoiceId = waybillRequest.getInvoiceId();
        final Long autoId = waybillRequest.getAutoId();

        final ClientCompany clientCompany = clientCompanyRepository
                .findById(companyId).orElseThrow(() -> new NotFoundException(CLIENT_NOT_FOUND_MESSAGE));
        waybill.setClientCompany(clientCompany);

        final Invoice invoice = invoiceRepository
                .findById(invoiceId).orElseThrow(() -> new NotFoundException(INVOICE_NOT_FOUND_MESSAGE));
        waybill.setInvoice(invoice);

        final Auto auto = autoRepository
                .findById(autoId).orElseThrow(() -> new NotFoundException(AUTO_NOT_FOUND_MESSAGE));
        waybill.setAuto(auto);

        waybill.getPoints().forEach(p -> p.setWaybill(waybill));

        final Waybill waybillDb = waybillRepository.save(waybill);

        log.info("Waybill has been saved {}", waybillDb);
    }

}
