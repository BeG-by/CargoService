package by.itechart.cargo.service.impl;

import by.itechart.cargo.dto.model_dto.act.ActRequest;
import by.itechart.cargo.dto.model_dto.act.ProductLostDto;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.model.Act;
import by.itechart.cargo.model.Invoice;
import by.itechart.cargo.model.Product;
import by.itechart.cargo.repository.*;
import by.itechart.cargo.service.ActService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

import static by.itechart.cargo.service.constant.MessageConstant.*;

@Service
@Transactional
@Slf4j
public class ActServiceImpl implements ActService {

    private final ActRepository actRepository;
    private final InvoiceRepository invoiceRepository;
    private final ProductRepository productRepository;

    @Autowired
    public ActServiceImpl(ActRepository actRepository,
                          InvoiceRepository invoiceRepository,
                          ProductRepository productRepository) {
        this.actRepository = actRepository;
        this.invoiceRepository = invoiceRepository;
        this.productRepository = productRepository;
    }

    @Override
    public Act findById(long id) throws NotFoundException {
        return actRepository.findById(id).orElseThrow(
                () -> new NotFoundException(ACT_NOT_FOUND_MESSAGE));
    }

    @Override
    public void save(ActRequest actRequest) throws NotFoundException {
        final Act act = actRequest.toAct();
        List<ProductLostDto> products = actRequest.getProducts();
        products.forEach(p -> {
            try {
                Product product = productRepository
                        .findById(p.getId()).orElseThrow(() -> new NotFoundException(PRODUCT_NOT_FOUND_MESSAGE));
                product.setProductStatus(p.getProductStatus());
                product.setLostQuantity(p.getLostQuantity());
                product.setComment(p.getComment());
            } catch (NotFoundException e) {
                e.printStackTrace();
            }
        });
        final Long invoiceId = actRequest.getInvoiceId();
        final Invoice invoice = invoiceRepository
                .findById(invoiceId).orElseThrow(() -> new NotFoundException(INVOICE_NOT_FOUND_MESSAGE));
        act.setActInvoice(invoice);
        final Act actDb = actRepository.save(act);
        log.info("Act has been saved {}", actDb);
    }

}
