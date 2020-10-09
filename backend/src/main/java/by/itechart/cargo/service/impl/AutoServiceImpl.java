package by.itechart.cargo.service.impl;

import by.itechart.cargo.dto.model_dto.auto.AutoPaginationResponse;
import by.itechart.cargo.dto.model_dto.auto.AutoSaveRequest;
import by.itechart.cargo.dto.model_dto.auto.AutoUpdateRequest;
import by.itechart.cargo.exception.AlreadyExistException;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.model.Auto;
import by.itechart.cargo.model.ClientCompany;
import by.itechart.cargo.repository.AutoRepository;
import by.itechart.cargo.repository.ClientCompanyRepository;
import by.itechart.cargo.security.JwtTokenUtil;
import by.itechart.cargo.service.AutoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
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

    //TODO manager can't recieve broken auto
    @Override
    public AutoPaginationResponse findAll(int page, int autoPerPage) {
        final long companyId = jwtTokenUtil.getCurrentCompanyId();

        PageRequest pageRequest = PageRequest.of(page, autoPerPage);
        List<Auto> autoList = autoRepository.findAllByClientCompanyIdAndStatus(companyId, Auto.Status.ACTIVE, pageRequest);
        long totalAmount = autoRepository.countAllByClientCompanyIdAndStatus(companyId, Auto.Status.ACTIVE);

        return new AutoPaginationResponse(totalAmount, autoList);
    }

    @Override
    public Auto findById(long autoId) throws NotFoundException {
        final long companyId = jwtTokenUtil.getCurrentCompanyId();
        return autoRepository.findByIdAndClientCompanyId(autoId, companyId)
                .filter(auto -> !auto.getStatus().equals(Auto.Status.DELETED))
                .orElseThrow(() -> new NotFoundException(AUTO_NOT_FOUND_MESSAGE));
    }

    @Override
    public void save(AutoSaveRequest autoRequest) throws AlreadyExistException {
        final Auto auto = autoRequest.toAuto();
        final String number = auto.getNumber();
        final long companyId = jwtTokenUtil.getCurrentCompanyId();

        if (autoRepository.findByNumberAndClientCompanyId(number, companyId)
                .filter(a -> !a.getStatus().equals(Auto.Status.DELETED))
                .isPresent()) {

            throw new AlreadyExistException(String.format("Auto with number '%s' already exist", number));
        }

        final ClientCompany clientCompany = clientCompanyRepository.getOne(companyId);
        auto.setClientCompany(clientCompany);
        final Auto autoDb = autoRepository.save(auto);
        log.info("Auto has been saved {}", autoDb);
    }

    @Override
    public void update(AutoUpdateRequest autoRequest) throws NotFoundException, AlreadyExistException {
        final Long autoId = autoRequest.getId();
        final long companyId = jwtTokenUtil.getCurrentCompanyId();
        final String number = autoRequest.getNumber();

        final Auto auto = autoRepository.findByIdAndClientCompanyId(autoId, companyId)
                .orElseThrow(() -> new NotFoundException(AUTO_NOT_FOUND_MESSAGE));

        final boolean isNumberExist = autoRepository.findByNumberAndClientCompanyId(number, companyId)
                .filter(a -> !a.getId().equals(autoId) && !a.getStatus().equals(Auto.Status.DELETED))
                .isPresent();

        if (isNumberExist) {
            throw new AlreadyExistException(String.format("Auto with number '%s' already exist", number));
        }

        auto.setMark(autoRequest.getMark());
        auto.setNumber(number);
        auto.setAutoType(Auto.AutoType.valueOf(autoRequest.getAutoType()));
        auto.setConsumption(autoRequest.getConsumption());
        auto.setMaxLoad(autoRequest.getMaxLoad());
        auto.setDateOfIssue(autoRequest.getDateOfIssue());
        auto.setStatus(Auto.Status.valueOf(autoRequest.getStatus()));

        log.info("Auto has been updated {}", auto);

    }

    @Override
    public void delete(long autoId) throws NotFoundException {
        final long companyId = jwtTokenUtil.getCurrentCompanyId();
        autoRepository.findByIdAndClientCompanyId(autoId, companyId)
                .map(auto -> {
                    auto.setStatus(Auto.Status.DELETED);
                    auto.setDeleteDate(LocalDate.now());
                    log.info("Auto has been deleted {}", auto);
                    return auto;
                })
                .orElseThrow(() -> new NotFoundException(AUTO_NOT_FOUND_MESSAGE));
    }

}
