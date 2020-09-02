package by.itechart.cargo.service.impl;

import by.itechart.cargo.model.freight.Waybill;
import by.itechart.cargo.repository.WaybillRepository;
import by.itechart.cargo.security.jwt.JwtTokenUtil;
import by.itechart.cargo.service.WaybillService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@Slf4j
public class WaybillServiceImpl implements WaybillService {

    private final WaybillRepository waybillRepository;
    private final JwtTokenUtil jwtTokenUtil;

    @Autowired
    public WaybillServiceImpl(WaybillRepository waybillRepository, JwtTokenUtil jwtTokenUtil) {
        this.waybillRepository = waybillRepository;
        this.jwtTokenUtil = jwtTokenUtil;
    }


    @Override
    public List<Waybill> findAll() {
        return waybillRepository.findByClientCompany(jwtTokenUtil.getJwtUser().getClientCompany());
    }


    @Override
    public void saveOne(Waybill waybill) {
        final Waybill waybillDb = waybillRepository.save(waybill);
        log.info("DeliveryNote has been saved" + waybill);
    }


}
