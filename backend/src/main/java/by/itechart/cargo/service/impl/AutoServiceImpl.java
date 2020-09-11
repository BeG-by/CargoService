package by.itechart.cargo.service.impl;

import by.itechart.cargo.dto.model_dto.auto.AutoRequest;
import by.itechart.cargo.model.ClientCompany;
import by.itechart.cargo.model.freight.Auto;
import by.itechart.cargo.repository.*;
import by.itechart.cargo.security.jwt.JwtTokenUtil;
import by.itechart.cargo.security.jwt.JwtUserDetails;
import by.itechart.cargo.service.AutoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@Slf4j
public class AutoServiceImpl implements AutoService {

    private final AutoRepository autoRepository;
    private final ClientCompanyRepository clientCompanyRepository;
    private final JwtTokenUtil jwtTokenUtil;

    @Autowired
    public AutoServiceImpl(AutoRepository autoRepository,
                           ClientCompanyRepository clientCompanyRepository,
                           JwtTokenUtil jwtTokenUtil) {

        this.autoRepository = autoRepository;
        this.clientCompanyRepository = clientCompanyRepository;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @Override
    public List<Auto> findAll() {
        return autoRepository.findByClientCompany(jwtTokenUtil.getJwtUser().getClientCompany());
    }

    @Override
    public Optional<Auto> findById(long id) {
        return autoRepository.findById(id);
    }

    @Override
    public void saveOne(AutoRequest autoRequest) {
        final Auto auto = autoRequest.toAuto();
        final JwtUserDetails currentUser = jwtTokenUtil.getJwtUser();
        final Long companyId = currentUser.getClientCompany().getId();
        final ClientCompany clientCompany = clientCompanyRepository.getOne(companyId);
        auto.setClientCompany(clientCompany);
        final Auto autoDb = autoRepository.save(auto);
        log.info("Auto has been saved {}", autoDb);
    }

}
