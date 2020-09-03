package by.itechart.cargo.service.impl;

import by.itechart.cargo.dto.model_dto.waybill.WaybillRequest;
import by.itechart.cargo.model.ClientCompany;
import by.itechart.cargo.model.User;
import by.itechart.cargo.model.enumeration.Status;
import by.itechart.cargo.model.enumeration.WaybillStatus;
import by.itechart.cargo.model.freight.Driver;
import by.itechart.cargo.model.freight.Waybill;
import by.itechart.cargo.repository.ClientCompanyRepository;
import by.itechart.cargo.repository.DriverRepository;
import by.itechart.cargo.repository.UserRepository;
import by.itechart.cargo.repository.WaybillRepository;
import by.itechart.cargo.security.jwt.JwtTokenUtil;
import by.itechart.cargo.security.jwt.JwtUserDetails;
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
    private final DriverRepository driverRepository;
    private final ClientCompanyRepository clientCompanyRepository;
    private final UserRepository userRepository;
    private final JwtTokenUtil jwtTokenUtil;

    @Autowired
    public WaybillServiceImpl(WaybillRepository waybillRepository,
                              DriverRepository driverRepository,
                              ClientCompanyRepository clientCompanyRepository,
                              UserRepository userRepository,
                              JwtTokenUtil jwtTokenUtil) {

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


    @Override
    public void saveOne(WaybillRequest waybillRequest) {
        final Waybill waybill = waybillRequest.toWayBill();

        final JwtUserDetails currentUser = jwtTokenUtil.getJwtUser();
        final Long companyId = currentUser.getClientCompany().getId();
        final Long driverId = waybillRequest.getDriverId();

        final Driver driver = driverRepository.getOne(driverId);
        waybill.setDriver(driver);

        final ClientCompany clientCompany = clientCompanyRepository.getOne(companyId);
        waybill.setClientCompany(clientCompany);

        final User user = userRepository.getOne(currentUser.getId());
        waybill.setRegistrationUser(user);

        waybill.getProducts().forEach(p -> {
            p.setWaybill(waybill);
            p.setProductStatus(Status.ACCEPTED);
        });
        waybill.setWaybillStatus(WaybillStatus.REGISTERED);

        final Waybill waybillDb = waybillRepository.save(waybill);

        log.info("Waybill has been saved {}", waybillDb);

    }


}
