package by.itechart.cargo.service.impl;

import by.itechart.cargo.model.freight.DeliveryNote;
import by.itechart.cargo.repository.DeliveryNoteRepository;
import by.itechart.cargo.security.jwt.JwtTokenUtil;
import by.itechart.cargo.service.DeliveryNoteService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@Slf4j
public class DeliveryNoteServiceImpl implements DeliveryNoteService {

    private final DeliveryNoteRepository deliveryNoteRepository;
    private final JwtTokenUtil jwtTokenUtil;

    @Autowired
    public DeliveryNoteServiceImpl(DeliveryNoteRepository deliveryNoteRepository, JwtTokenUtil jwtTokenUtil) {
        this.deliveryNoteRepository = deliveryNoteRepository;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    //TODO fixed by company id
    @Override
    public List<DeliveryNote> findAll() {
        return deliveryNoteRepository.findAll();
    }


    @Override
    public void saveOne(DeliveryNote deliveryNote) {
        final DeliveryNote deliveryNoteDb = deliveryNoteRepository.save(deliveryNote);
        log.info("DeliveryNote has been saved" + deliveryNote);
    }


}
