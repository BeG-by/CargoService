package by.itechart.cargo.service;

import by.itechart.cargo.dto.model_dto.auto.AutoPaginationResponse;
import by.itechart.cargo.dto.model_dto.auto.AutoSaveRequest;
import by.itechart.cargo.exception.AlreadyExistException;
import by.itechart.cargo.model.Auto;
import by.itechart.cargo.model.ClientCompany;
import by.itechart.cargo.repository.AutoRepository;
import by.itechart.cargo.repository.ClientCompanyRepository;
import by.itechart.cargo.security.JwtTokenUtil;
import by.itechart.cargo.service.impl.AutoServiceImpl;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InOrder;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.TestPropertySource;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Collections;
import java.util.Optional;

import static by.itechart.cargo.service.MockEntityFactory.getMockCompany;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@TestPropertySource("/application-test.properties")
public class AutoServiceImplTest {
    @Autowired
    public AutoService autoService;

    @MockBean
    public AutoRepository autoRepository;

    @MockBean
    public ClientCompanyRepository clientCompanyRepository;

    @MockBean
    public JwtTokenUtil jwtTokenUtil;

    @Test
    @DisplayName("findAll() - should return empty list")
    public void should_returnEmptyList() {
        final long COMPANY_ID = 1;

        Mockito.when(jwtTokenUtil.getCurrentCompanyId()).thenReturn(COMPANY_ID);
        Mockito.when(autoRepository.findAllByClientCompanyIdAndNotDeleted(COMPANY_ID)).thenReturn(Collections.emptyList());

        AutoPaginationResponse all = autoService.findAll();

        assertEquals(0, all.getAutoList().size());

        Mockito.verify(jwtTokenUtil, Mockito.times(1)).getCurrentCompanyId();
        Mockito.verify(autoRepository).findAllByClientCompanyIdAndNotDeleted(COMPANY_ID);
    }


    @Test
    @DisplayName("save() - should call save with valid params")
    public void should_save_whenGivenValidParams() throws Exception {
        final long COMPANY_ID = 1;

        AutoSaveRequest autoSaveRequest = generateAutoSaveRequest();
        Auto auto = autoSaveRequest.toAuto();
        String autoNumber = auto.getNumber();
        ClientCompany clientCompany = getMockCompany();
        clientCompany.setId(COMPANY_ID);

        Mockito.when(jwtTokenUtil.getCurrentCompanyId()).thenReturn(COMPANY_ID);
        Mockito.when(autoRepository.findByNumberAndClientCompanyId(autoNumber, COMPANY_ID)).thenReturn(Optional.empty());
        Mockito.when(clientCompanyRepository.getOne(COMPANY_ID)).thenReturn(clientCompany);
        Mockito.when(autoRepository.save(auto)).thenReturn(auto);

        autoService.save(autoSaveRequest);

        auto.setClientCompany(clientCompany);

        InOrder inOrder = Mockito.inOrder(jwtTokenUtil, autoRepository, clientCompanyRepository, autoRepository);
        inOrder.verify(jwtTokenUtil).getCurrentCompanyId();
        inOrder.verify(autoRepository).findByNumberAndClientCompanyId(autoNumber, COMPANY_ID);
        inOrder.verify(clientCompanyRepository).getOne(COMPANY_ID);
        inOrder.verify(autoRepository).save(auto);
    }


    AutoSaveRequest generateAutoSaveRequest() {
        return AutoSaveRequest.builder()
                .autoType(Auto.AutoType.JUMBO.toString())
                .consumption(BigDecimal.valueOf(123))
                .dateOfIssue(LocalDate.now())
                .mark("MAZ")
                .maxLoad(123)
                .number("123")
                .build();
    }

}
