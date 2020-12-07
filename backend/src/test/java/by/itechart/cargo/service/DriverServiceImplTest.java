package by.itechart.cargo.service;

import by.itechart.cargo.dto.model_dto.user.UserResponse;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.model.Role;
import by.itechart.cargo.model.User;
import by.itechart.cargo.repository.RoleRepository;
import by.itechart.cargo.repository.UserRepository;
import by.itechart.cargo.security.JwtTokenUtil;
import by.itechart.cargo.security.JwtUserDetails;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.TestPropertySource;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@TestPropertySource("/application-test.properties")
public class DriverServiceImplTest {

    @Autowired
    public DriverService driverService;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private RoleRepository roleRepository;

    @MockBean
    private JwtTokenUtil jwtTokenUtil;

    @Test
    @DisplayName("findAll() - should return empty list")
    public void should_returnEmptyList() {
        JwtUserDetails jwtUserMock = MockEntityFactory.getMockJwtUser(Role.RoleType.DRIVER);
        User userMock = jwtUserMock.toUser();
        Role roleMock = userMock.getRoles().stream().findFirst().get();

        Mockito.when(jwtTokenUtil.getJwtUser()).thenReturn(jwtUserMock);
        Mockito.when(roleRepository.getByRole(Role.RoleType.DRIVER)).thenReturn(roleMock);
        Mockito.when(userRepository.findAllByClientCompanyIdAndRoles(jwtUserMock.getId(), roleMock)).thenReturn(Collections.emptyList());

        List<UserResponse> all = driverService.findAll();

        assertEquals(0, all.size());
    }


    @Test
    @DisplayName("findAll() - should return list with three users")
    public void should_returnListWithThreeUsers() {
        JwtUserDetails jwtUserMock = MockEntityFactory.getMockJwtUser(Role.RoleType.DRIVER);
        Role roleMock = jwtUserMock.toUser().getRoles().stream().findFirst().get();
        List<User> userListMock = MockEntityFactory.getUserList();

        Mockito.when(jwtTokenUtil.getJwtUser()).thenReturn(jwtUserMock);
        Mockito.when(roleRepository.getByRole(Role.RoleType.DRIVER)).thenReturn(roleMock);
        Mockito.when(userRepository.findAllByClientCompanyIdAndRoles(jwtUserMock.getId(), roleMock)).thenReturn(userListMock);

        List<UserResponse> userList = driverService.findAll();

        for (int i = 0; i < userList.size(); i++) {
            assertEquals(userList.get(i).getId(), userListMock.get(i).getId());
        }
    }

    @Test
    @DisplayName("findById() - should throw UserNotFoundException")
    public void should_throwUserNotFoundException_whenGivenInvalidId() {
        final long INVALID_ID = -1;
        final long VALID_ID = 1;

        JwtUserDetails jwtUserMock = MockEntityFactory.getMockJwtUser(Role.RoleType.DRIVER);
        User userMock = jwtUserMock.toUser();
        Role roleMock = userMock.getRoles().stream().findFirst().get();

        Mockito.when(jwtTokenUtil.getJwtUser()).thenReturn(jwtUserMock);
        Mockito.when(roleRepository.getByRole(Role.RoleType.DRIVER)).thenReturn(roleMock);
        Mockito.when(userRepository.findByIdAndRolesAndClientCompanyId(INVALID_ID, roleMock, userMock.getClientCompany().getId()))
                .thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> driverService.findById(INVALID_ID));
    }

    @Test
    @DisplayName("findById() - should return valid user")
    public void should_returnUser_whenGivenValidId() throws Exception {
        final long VALID_ID = 1;

        JwtUserDetails jwtUserMock = MockEntityFactory.getMockJwtUser(Role.RoleType.DRIVER);
        User userMock = jwtUserMock.toUser();
        Role roleMock = userMock.getRoles().stream().findFirst().get();

        Mockito.when(jwtTokenUtil.getJwtUser()).thenReturn(jwtUserMock);
        Mockito.when(roleRepository.getByRole(Role.RoleType.DRIVER)).thenReturn(roleMock);
        Mockito.when(userRepository.findByIdAndRolesAndClientCompanyId(VALID_ID, roleMock, userMock.getClientCompany().getId()))
                .thenReturn(Optional.of(userMock));

        UserResponse actualUser = driverService.findById(VALID_ID);
        assertEquals(userMock.getId(), actualUser.getId());
        assertEquals(userMock.getName(), actualUser.getName());
        assertEquals(userMock.getSurname(), actualUser.getSurname());
    }

}
