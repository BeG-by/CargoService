package by.itechart.cargo.service.impl;

import by.itechart.cargo.dto.act.ActRequest;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.model.enumeration.InvoiceStatus;
import by.itechart.cargo.model.freight.Act;
import by.itechart.cargo.model.freight.Invoice;
import by.itechart.cargo.repository.*;
import by.itechart.cargo.service.ActService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import static by.itechart.cargo.service.constant.MessageConstant.*;

@Service
@Transactional
@Slf4j
public class ActServiceImpl implements ActService {

    private final ActRepository actRepository;
    private final InvoiceRepository invoiceRepository;

    @Autowired
    public ActServiceImpl(ActRepository actRepository,
                          InvoiceRepository invoiceRepository) {
        this.actRepository = actRepository;
        this.invoiceRepository = invoiceRepository;
    }

    @Override
    public Act findById(long id) throws NotFoundException {
        return actRepository.findById(id).orElseThrow(
                () -> new NotFoundException(ACT_NOT_FOUND_MESSAGE));
    }

    @Override
    public void save(ActRequest actRequest) throws NotFoundException {
        final Act act = actRequest.toAct();
        final Long invoiceId = actRequest.getInvoiceId();
        final Invoice invoice = invoiceRepository
                .findById(invoiceId).orElseThrow(() -> new NotFoundException(INVOICE_NOT_FOUND_MESSAGE));
        invoice.setProducts(actRequest.getProducts());
        invoiceRepository.save(invoice);
        act.setInvoice(invoice);
        final Act actDb = actRepository.save(act);
        log.info("Act has been saved {}", actDb);
    }

}
