package by.itechart.cargo.service.impl;

import by.itechart.cargo.dto.model_dto.auto.AutoRequest;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.model.ClientCompany;
import by.itechart.cargo.model.Auto;
import by.itechart.cargo.repository.AutoRepository;
import by.itechart.cargo.repository.ClientCompanyRepository;
import by.itechart.cargo.security.jwt.JwtTokenUtil;
import by.itechart.cargo.security.jwt.JwtUserDetails;
import by.itechart.cargo.service.AutoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

import static by.itechart.cargo.service.constant.MessageConstant.AUTO_NOT_FOUND_MESSAGE;

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
    public Auto findById(long id) throws NotFoundException {
        return autoRepository.findById(id).orElseThrow(() ->
                new NotFoundException(AUTO_NOT_FOUND_MESSAGE));
    }

    @Override
    public void save(AutoRequest autoRequest) {
        final Auto auto = autoRequest.toAuto();
        final JwtUserDetails currentUser = jwtTokenUtil.getJwtUser();
        final Long companyId = currentUser.getClientCompany().getId();
        final ClientCompany clientCompany = clientCompanyRepository.getOne(companyId);
        auto.setClientCompany(clientCompany);
        final Auto autoDb = autoRepository.save(auto);
        log.info("Auto has been saved {}", autoDb);
    }

}
