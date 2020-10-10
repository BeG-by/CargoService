package by.itechart.cargo.service.impl;

import by.itechart.cargo.dto.model_dto.waybill.WaybillRequest;
import by.itechart.cargo.dto.model_dto.waybill.WaybillTableResponse;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.model.ClientCompany;
import by.itechart.cargo.model.Auto;
import by.itechart.cargo.model.Invoice;
import by.itechart.cargo.model.Waybill;
import by.itechart.cargo.repository.AutoRepository;
import by.itechart.cargo.repository.ClientCompanyRepository;
import by.itechart.cargo.repository.InvoiceRepository;
import by.itechart.cargo.repository.WaybillRepository;
import by.itechart.cargo.security.JwtTokenUtil;
import by.itechart.cargo.security.JwtUserDetails;
import by.itechart.cargo.service.WaybillService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.sql.Driver;
import java.util.List;
import java.util.stream.Collectors;

import static by.itechart.cargo.service.constant.MessageConstant.*;

@Service
@Transactional
@Slf4j
public class WaybillServiceImpl implements WaybillService {

    private final ClientCompanyRepository clientCompanyRepository;
    private final WaybillRepository waybillRepository;
    private final ElasticsearchWaybillRepository elasticsearchWaybillRepository;
    private final AutoRepository autoRepository;
    private final InvoiceRepository invoiceRepository;
    private final JwtTokenUtil jwtTokenUtil;

    @Autowired
    public WaybillServiceImpl(ClientCompanyRepository clientCompanyRepository,
                              WaybillRepository waybillRepository,
                              AutoRepository autoRepository,
                              ElasticsearchWaybillRepository elasticsearchWaybillRepository,
                              InvoiceRepository invoiceRepository,
                              JwtTokenUtil jwtTokenUtil) {
        this.clientCompanyRepository = clientCompanyRepository;
        this.waybillRepository = waybillRepository;
        this.elasticsearchWaybillRepository = elasticsearchWaybillRepository;
        this.autoRepository = autoRepository;
        this.invoiceRepository = invoiceRepository;
        this.jwtTokenUtil = jwtTokenUtil;
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

        final Long driverId = invoice.getDriver().getId();
        if (findByStatusAndDriverId(driverId) == null) {
            waybill.setStatus(Waybill.WaybillStatus.CURRENT);
        } else {
            waybill.setStatus(Waybill.WaybillStatus.FUTURE);
        }

        final Auto auto = autoRepository
                .findById(autoId).orElseThrow(() -> new NotFoundException(AUTO_NOT_FOUND_MESSAGE));
        waybill.setAuto(auto);

        waybill.getPoints().forEach(p -> p.setWaybill(waybill));

        final Waybill waybillDb = waybillRepository.save(waybill);

        elasticsearchWaybillRepository.save(ElasticsearchWaybill.fromWaybill(waybillDb));
        log.info("Waybill has been saved {}", waybillDb);
    }

    @Override
    public Waybill findByStatusAndDriverId(Long driverId) {
        final JwtUserDetails currentUser = jwtTokenUtil.getJwtUser();
        final Long companyId = currentUser.getClientCompany().getId();
        return waybillRepository.findByStatusAndDriverIdY(driverId, companyId);
    }

    @Override
    public Waybill findByStatusAndDriverId() {
        final JwtUserDetails currentUser = jwtTokenUtil.getJwtUser();
        final Long companyId = currentUser.getClientCompany().getId();
        final Long driverId = currentUser.getId();
        return waybillRepository.findByStatusAndDriverIdY(driverId, companyId);
    }

    @Override
    public WaybillPaginationResponse findAllByRegistrationUser(Integer page, Integer waybillsPerPage) {
        JwtUserDetails jwtUser = jwtTokenUtil.getJwtUser();
        Long clientCompanyId = jwtUser.getClientCompany().getId();
        PageRequest pageRequest = PageRequest.of(page, waybillsPerPage);

        Page<Waybill> waybillsPage = waybillRepository.findAllByClientCompanyIdAndRegistrationUserId(clientCompanyId, jwtUser.getId(), pageRequest);
        List<WaybillResponse> waybills = waybillsPage.get().map(WaybillResponse::toWaybillResponse).collect(Collectors.toList());
        return new WaybillPaginationResponse(waybillsPage.getTotalElements(), waybills);
    }

    @Override
    public WaybillPaginationResponse findAllByRegistrationUserAndInvoiceNumber(String invoiceNumber, Integer page, Integer waybillsPerPage) {
        JwtUserDetails jwtUser = jwtTokenUtil.getJwtUser();
        Long clientCompanyId = jwtUser.getClientCompany().getId();
        PageRequest pageRequest = PageRequest.of(page, waybillsPerPage);

        Page<ElasticsearchWaybill> waybillPage = elasticsearchWaybillRepository.findAllByInvoiceNumberStartsWithAndClientCompanyIdAndCheckingUserId(
                invoiceNumber,
                clientCompanyId,
                jwtUser.getId(),
                pageRequest);

        long totalAmount = waybillPage.getTotalElements();
        List<Long> ids = waybillPage.stream()
                .map(ElasticsearchWaybill::getId)
                .collect(Collectors.toList());

        List<WaybillResponse> waybills = waybillRepository.findALlByIdIsIn(ids).stream()
                .map(WaybillResponse::toWaybillResponse)
                .collect(Collectors.toList());

        return new WaybillPaginationResponse(totalAmount, waybills);
    }

    @Override
    public WaybillPaginationResponse findAllByDriver(Integer page, Integer waybillsPerPage) {
        JwtUserDetails jwtUser = jwtTokenUtil.getJwtUser();
        Long clientCompanyId = jwtUser.getClientCompany().getId();
        PageRequest pageRequest = PageRequest.of(page, waybillsPerPage);

        Page<Waybill> waybillsPage = waybillRepository.findAllByClientCompanyIdAndDriverId(clientCompanyId, jwtUser.getId(), pageRequest);
        List<WaybillResponse> waybills = waybillsPage.stream()
                .map(WaybillResponse::toWaybillResponse)
                .collect(Collectors.toList());

        return new WaybillPaginationResponse(waybillsPage.getTotalElements(), waybills);
    }

    @Override
    public WaybillPaginationResponse findAllByDriverAndInvoiceNumber(String invoiceNumber, Integer page, Integer waybillsPerPage) {
        invoiceNumber = invoiceNumber.replace(" ", "");
        JwtUserDetails jwtUser = jwtTokenUtil.getJwtUser();
        Long clientCompanyId = jwtUser.getClientCompany().getId();
        PageRequest pageRequest = PageRequest.of(page, waybillsPerPage);

        Page<ElasticsearchWaybill> waybillPage = elasticsearchWaybillRepository.findAllByInvoiceNumberStartsWithAndClientCompanyIdAndDriverId(
                invoiceNumber,
                clientCompanyId,
                jwtUser.getId(),
                pageRequest);

        long totalAmount = waybillPage.getTotalElements();
        List<Long> ids = waybillPage.stream()
                .map(ElasticsearchWaybill::getId)
                .collect(Collectors.toList());

        List<WaybillResponse> waybills = waybillRepository.findALlByIdIsIn(ids).stream()
                .map(WaybillResponse::toWaybillResponse)
                .collect(Collectors.toList());

        return new WaybillPaginationResponse(totalAmount, waybills);
    }

}
