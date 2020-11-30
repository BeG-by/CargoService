package by.itechart.cargo.service_layer;

import by.itechart.cargo.model.Role;
import by.itechart.cargo.repository.RoleRepository;
import by.itechart.cargo.repository.UserRepository;
import by.itechart.cargo.security.JwtTokenUtil;
import by.itechart.cargo.service.impl.DriverServiceImpl;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Collections;

import static org.mockito.Mockito.when;

@WebMvcTest(DriverServiceImpl.class)
public class DriverServiceTest {

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private RoleRepository roleRepository;

    @MockBean
    private JwtTokenUtil jwtTokenUtil;


    @Test
    public void findAllShouldReturnEmptyList() throws Exception {
        when(jwtTokenUtil.getJwtUser().getClientCompany().getId()).thenReturn(1L);
        when(roleRepository.getByRole(Role.RoleType.DRIVER)).thenReturn(new Role(5, Role.RoleType.DRIVER, null));
        when(userRepository.findAllByClientCompanyIdAndRoles(Mockito.any(), Mockito.any())).thenReturn(Collections.emptyList());

    }
}
