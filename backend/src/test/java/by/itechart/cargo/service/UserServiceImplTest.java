package by.itechart.cargo.service;

import by.itechart.cargo.dto.model_dto.user.*;
import by.itechart.cargo.exception.AlreadyExistException;
import by.itechart.cargo.exception.IncorrectPasswordException;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.model.ActivationDetails;
import by.itechart.cargo.model.ClientCompany;
import by.itechart.cargo.model.User;
import by.itechart.cargo.repository.ActivationDetailsRepository;
import by.itechart.cargo.repository.ClientCompanyRepository;
import by.itechart.cargo.repository.UserRepository;
import by.itechart.cargo.security.JwtTokenUtil;
import by.itechart.cargo.security.JwtUserDetails;
import lombok.SneakyThrows;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UserServiceImplTest {


    @Autowired
    private UserService userService;

    @MockBean
    private JwtTokenUtil jwtTokenUtil;

    @MockBean
    private ClientCompanyRepository clientCompanyRepository;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private MailSenderService mailSenderService;

    @MockBean
    private ActivationDetailsRepository activationDetailsRepository;

    @MockBean
    private PasswordEncoder passwordEncoder;

    @MockBean
    private AWSS3Service awss3Service;

    @BeforeEach
    void setup() {
        Mockito.when(jwtTokenUtil.getCurrentCompanyId()).thenReturn(-1L);
    }


    @DisplayName("findInfo() - should return user and company in userResponse")
    @Test
    void should_returnUser_and_returnCompany() {

        JwtUserDetails mockJwtUser = MockEntityFactory.getMockJwtUser();
        User mockUser = mockJwtUser.toUser();
        ClientCompany mockCompany = MockEntityFactory.getMockCompany();

        Mockito.when(jwtTokenUtil.getJwtUser()).thenReturn(mockJwtUser);
        Mockito.when(clientCompanyRepository.findByIdAndNotDeleted(-1L)).thenReturn(Optional.of(mockCompany));

        UserInfoResponse userInfoResponse = userService.findInfo();

        assertEquals(userInfoResponse.getUser().getId(), mockUser.getId());
        assertEquals(userInfoResponse.getUser().getEmail(), mockUser.getEmail());
        assertEquals(userInfoResponse.getCompany().getId(), mockCompany.getId());
        assertEquals(userInfoResponse.getCompany().getEmail(), mockCompany.getEmail());

    }

    @SneakyThrows
    @DisplayName("findUserById() - Should return userResponse")
    @Test
    void should_returnUser_whenGivenId() {

        User mockUser = MockEntityFactory.getMockUser();

        Mockito.when(userRepository.findByIdAndClientCompanyId(-1L, -1L)).thenReturn(Optional.of(mockUser));

        UserResponse userResponse = userService.findById(-1L);

        assertEquals(userResponse.getId(), -1L);
        assertEquals(userResponse.getEmail(), mockUser.getEmail());
        assertEquals(userResponse.getStatus(), mockUser.getStatus().toString());

    }


    @DisplayName("findUserById() - should throw NotFoundException")
    @Test
    void should_throwNotFondException_whenUserStatusEqualsDeleted() {

        User mockUser = MockEntityFactory.getMockUser();
        mockUser.setStatus(User.Status.DELETED);

        Mockito.when(userRepository.findByIdAndClientCompanyId(-1L, -1L)).thenReturn(Optional.of(mockUser));

        assertThrows(NotFoundException.class, () -> userService.findById(-1L));

    }

    @DisplayName("findAll() - should return userList without deleted users")
    @Test
    void should_returnUserListWithoutDeleted() {

        List<User> userList = MockEntityFactory
                .getUserList()
                .stream()
                .filter(user -> !user.getStatus().equals(User.Status.DELETED))
                .collect(Collectors.toList());

        Mockito.when(userRepository.findAllWithoutDeleted(Mockito.anyLong(), Mockito.any())).thenReturn(userList);

        List<UserResponse> userResponses = userService.findAll();
        assertNotNull(userResponses);
        userResponses.forEach(u -> assertNotEquals(u.getStatus(), User.Status.DELETED));

    }

    @SneakyThrows
    @DisplayName("sendActivationLink() - should send activation link to email once time")
    @Test
    void should_sendMessage_whenGivenActivationDetails() {

        String code = "code";
        String email = "mock@gmail.com";
        String role = "ADMIN";

        Mockito.when(activationDetailsRepository.findByEmail(Mockito.anyString())).thenReturn(Optional.empty());
        Mockito.when(userRepository.findByEmail(Mockito.anyString())).thenReturn(Optional.empty());
        Mockito.when(mailSenderService.sendActivationMail(Mockito.anyString(), Mockito.anyString())).thenReturn(code);

        userService.sendActivationLink(new ActivationDetailsRequest(email, role));

        Mockito.verify(mailSenderService, Mockito.times(1)).sendActivationMail(email, role);
        Mockito.verify(activationDetailsRepository, Mockito.times(1)).save(Mockito.any());

    }

    @DisplayName("sendActivationLink() - should throw AlreadyExistException")
    @Test
    void should_throwAlreadyExistException_whenGivenActivationDetails() {

        String email = "mock@gmail.com";
        String role = "ADMIN";

        Mockito.when(activationDetailsRepository.findByEmail(Mockito.anyString())).thenReturn(Optional.of(new ActivationDetails()));

        assertThrows(AlreadyExistException.class, () -> userService.sendActivationLink(new ActivationDetailsRequest(email, role)));

    }

    @SneakyThrows
    @DisplayName("update() - should call encode password function at least one time and update user")
    @Test
    void should_updateUser_whenGivenNewUser() {

        String password = "mockPassword";

        UserUpdateRequest userUpdateRequest = new UserUpdateRequest();
        userUpdateRequest.setPassword(password);
        userUpdateRequest.setId(-1L);
        userUpdateRequest.setRoles(new HashSet<>());
        userUpdateRequest.setStatus("ACTIVE");

        Mockito.when(userRepository.findByIdAndClientCompanyId(Mockito.anyLong(), Mockito.anyLong())).thenReturn(Optional.of(MockEntityFactory.getMockUser()));

        userService.update(userUpdateRequest);

        Mockito.verify(userRepository, Mockito.atLeastOnce()).findByIdAndClientCompanyId(-1L, -1L);
        Mockito.verify(passwordEncoder, Mockito.atLeastOnce()).encode(password);

    }

    @SneakyThrows
    @DisplayName("update() - should throw AlreadyExistException")
    @Test
    void should_throwNotFoundException_whenGivenIncorrectEmail() {

        UserUpdateRequest userUpdateRequest = new UserUpdateRequest();
        userUpdateRequest.setId(-1L);
        userUpdateRequest.setRoles(new HashSet<>());
        userUpdateRequest.setStatus("ACTIVE");

        Mockito.when(userRepository.findByIdAndClientCompanyId(-1L, -1L)).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> userService.update(userUpdateRequest));

        Mockito.verify(passwordEncoder, Mockito.never()).encode(Mockito.anyString());

    }


    @SneakyThrows
    @DisplayName("updatePhoto() - should call awsService to upload file")
    @Test
    void should_uploadFileToAWS_whenUpdatePhoto() {

        PhotoRequest photoRequest = new PhotoRequest();
        photoRequest.setPhoto("photo");

        Mockito.when(jwtTokenUtil.getJwtUser()).thenReturn(MockEntityFactory.getMockJwtUser());
        Mockito.when(userRepository.findByIdAndClientCompanyId(Mockito.anyLong(), Mockito.anyLong())).thenReturn(Optional.of(MockEntityFactory.getMockUser()));

        userService.updatePhoto(photoRequest, -1L);

        Mockito.verify(awss3Service, Mockito.times(1)).uploadFile("photo", "-1");

    }

    @SneakyThrows
    @DisplayName("updatePassword() - should call encode password function at least one time")
    @Test
    void should_updatePassword_whenGivenCorrectPasswordRequest() {

        PasswordRequest passwordRequest = new PasswordRequest();
        passwordRequest.setOldPassword("mockPassword");
        passwordRequest.setNewPassword("new");
        passwordRequest.setConfirmNewPassword("new");

        Mockito.when(jwtTokenUtil.getJwtUser()).thenReturn(MockEntityFactory.getMockJwtUser());
        Mockito.when(passwordEncoder.matches("mockPassword", "mockPassword")).thenReturn(true);
        Mockito.when(userRepository.findByIdAndClientCompanyId(-1L, -1L)).thenReturn(Optional.of(MockEntityFactory.getMockUser()));

        userService.updatePassword(passwordRequest);

        Mockito.verify(passwordEncoder, Mockito.atLeastOnce()).encode("new");

    }


    @SneakyThrows
    @DisplayName("updatePassword() - should call encode password function at least one time")
    @Test
    void should_throwIncorrectPasswordException_whenNewPasswordDoesNotMatchWithConfirmPassword() {

        PasswordRequest passwordRequest = new PasswordRequest();
        passwordRequest.setOldPassword("mockPassword");
        passwordRequest.setNewPassword("new");
        passwordRequest.setConfirmNewPassword("new_new");

        Mockito.when(jwtTokenUtil.getJwtUser()).thenReturn(MockEntityFactory.getMockJwtUser());
        Mockito.when(passwordEncoder.matches("mockPassword", "mockPassword")).thenReturn(true);

        assertThrows(IncorrectPasswordException.class, () -> userService.updatePassword(passwordRequest));

    }


}
