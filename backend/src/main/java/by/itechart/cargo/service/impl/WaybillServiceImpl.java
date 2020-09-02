package by.itechart.cargo.service.impl;

import by.itechart.cargo.dto.model_dto.WaybillRequest;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.model.ClientCompany;
import by.itechart.cargo.model.User;
import by.itechart.cargo.model.enumeration.Status;
import by.itechart.cargo.model.freight.Driver;
import by.itechart.cargo.model.freight.Waybill;
import by.itechart.cargo.repository.ClientCompanyRepository;
import by.itechart.cargo.repository.DriverRepository;
import by.itechart.cargo.repository.UserRepository;
import by.itechart.cargo.repository.WaybillRepository;
import by.itechart.cargo.security.jwt.JwtTokenUtil;
import by.itechart.cargo.service.WaybillService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

import static by.itechart.cargo.service.constant.MessageConstant.*;

@Service
@Transactional
@Slf4j
public class WaybillServiceImpl implements WaybillService {

    private final WaybillRepository waybillRepository;
    private final DriverRepository driverRepository;
    private final ClientCompanyRepository clientCompanyRepository;
    private final UserRepository userRepository;
    private final JwtTokenUtil jwtTokenUtil;

    public WaybillServiceImpl(WaybillRepository waybillRepository, DriverRepository driverRepository, ClientCompanyRepository clientCompanyRepository, UserRepository userRepository, JwtTokenUtil jwtTokenUtil) {
        this.waybillRepository = waybillRepository;
        this.driverRepository = driverRepository;
        this.clientCompanyRepository = clientCompanyRepository;
        this.userRepository = userRepository;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @Override
    public List<Waybill> findAll() {
        return waybillRepository.findByClientCompany(jwtTokenUtil.getJwtUser().getClientCompany());
    }


    // TODO not effective, not working
    @Override
    public void saveOne(WaybillRequest waybillRequest) throws NotFoundException {
        final Waybill waybill = waybillRequest.toWayBill();

        waybill.getProducts().forEach(p-> p.setProductStatus(Status.ACCEPTED));

        final Driver driver = driverRepository.findById(waybillRequest.getDriverId()).orElseThrow(() -> new NotFoundException(DRIVER_NOT_FOUND_MESSAGE));
        waybill.setDriver(driver);

        final ClientCompany clientCompany = clientCompanyRepository.findById(jwtTokenUtil.getJwtUser().getClientCompany().getId()).orElseThrow(() -> new NotFoundException(CLIENT_NOT_FOUND_MESSAGE));
        waybill.setClientCompany(clientCompany);

        final User user = userRepository.findById(jwtTokenUtil.getJwtUser().getId()).orElseThrow(() -> new NotFoundException(USER_NOT_FOUND_MESSAGE));
        waybill.setRegistrationUser(user);

        final Waybill waybillDb = waybillRepository.save(waybill);
        log.info("DeliveryNote has been saved" + waybillDb);
    }


}
