package by.itechart.cargo.service.impl;

import by.itechart.cargo.dto.model_dto.user.*;
import by.itechart.cargo.exception.AlreadyExistException;
import by.itechart.cargo.exception.IncorrectPasswordException;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.exception.ServiceException;
import by.itechart.cargo.model.ClientCompany;
import by.itechart.cargo.model.Role;
import by.itechart.cargo.model.User;
import by.itechart.cargo.model.ActivationDetails;
import by.itechart.cargo.repository.ClientCompanyRepository;
import by.itechart.cargo.repository.RoleRepository;
import by.itechart.cargo.repository.UserRepository;
import by.itechart.cargo.repository.ActivationDetailsRepository;
import by.itechart.cargo.security.JwtTokenUtil;
import by.itechart.cargo.service.AWSS3Service;
import by.itechart.cargo.service.MailSenderService;
import by.itechart.cargo.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;


import static by.itechart.cargo.service.util.MessageConstant.*;


@Service
@Transactional
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ClientCompanyRepository clientCompanyRepository;
    private final RoleRepository roleRepository;
    private final JwtTokenUtil jwtTokenUtil;
    private final PasswordEncoder passwordEncoder;
    private final AWSS3Service awss3Service;
    private final MailSenderService mailSenderService;
    private final ActivationDetailsRepository activationDetailsRepository;


    @Autowired
    public UserServiceImpl(UserRepository userRepository,
                           ClientCompanyRepository clientCompanyRepository,
                           RoleRepository roleRepository,
                           JwtTokenUtil jwtTokenUtil,
                           PasswordEncoder passwordEncoder,
                           AWSS3Service awss3Service,
                           MailSenderService mailSenderService,
                           ActivationDetailsRepository activationDetailsRepository) {

        this.userRepository = userRepository;
        this.clientCompanyRepository = clientCompanyRepository;
        this.roleRepository = roleRepository;
        this.jwtTokenUtil = jwtTokenUtil;
        this.passwordEncoder = passwordEncoder;
        this.awss3Service = awss3Service;
        this.mailSenderService = mailSenderService;
        this.activationDetailsRepository = activationDetailsRepository;
    }

    @Override
    public UserInfoResponse findInfo() {
        final User authUser = jwtTokenUtil.getJwtUser().toUser();
        final Long companyId = jwtTokenUtil.getCurrentCompanyId();
        final ClientCompany clientCompany = clientCompanyRepository.findByIdAndNotDeleted(companyId).orElse(new ClientCompany());
        return new UserInfoResponse(UserResponse.toUserResponse(authUser), clientCompany);
    }

    @Override
    public UserResponse findById(long id) throws NotFoundException {
        final Long companyId = jwtTokenUtil.getCurrentCompanyId();
        return userRepository.findByIdAndClientCompanyId(id, companyId)
                .filter(user -> !user.getStatus().equals(User.Status.DELETED))
                .map(UserResponse::toUserResponse)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND_MESSAGE));
    }

    @Override
    public List<UserResponse> findAll() {
        final Long companyId = jwtTokenUtil.getCurrentCompanyId();
        return userRepository.findAllWithoutDeleted(companyId, Sort.by("id"))
                .stream()
                .map(UserResponse::toUserResponse)
                .collect(Collectors.toList());
    }


    @Override
    public UserResponse findDriverByInvoiceId(Long invoiceId) throws NotFoundException {
        final Long companyId = jwtTokenUtil.getCurrentCompanyId();
        return userRepository.findByClientCompanyIdAndDriverId(companyId, invoiceId)
                .filter(user -> !user.getStatus().equals(User.Status.DELETED))
                .map(UserResponse::toUserResponse)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND_MESSAGE));
    }

    @Override
    public UserResponse findDispatcherByInvoiceId(Long invoiceId) throws NotFoundException {
        final Long companyId = jwtTokenUtil.getCurrentCompanyId();
        return userRepository.findByClientCompanyIdAndRegistrationInvoiceId(companyId, invoiceId)
                .filter(user -> !user.getStatus().equals(User.Status.DELETED))
                .map(UserResponse::toUserResponse)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND_MESSAGE));
    }

    @Override
    public UserResponse findManagerByInvoiceId(Long invoiceId) throws NotFoundException {
        final Long companyId = jwtTokenUtil.getCurrentCompanyId();
        return userRepository.findByClientCompanyIdAndCheckingInvoiceId(companyId, invoiceId)
                .filter(user -> !user.getStatus().equals(User.Status.DELETED))
                .map(UserResponse::toUserResponse)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND_MESSAGE));
    }


    @Override
    public void sendActivationLink(ActivationDetailsRequest request) throws AlreadyExistException, ServiceException {

        final String email = request.getEmail();
        final String role = request.getRole();

        final Long companyId = jwtTokenUtil.getCurrentCompanyId();

        final Optional<ActivationDetails> userToActivateDb = activationDetailsRepository.findByEmail(email);

        if (userToActivateDb.isPresent()) {
            throw new AlreadyExistException(String.format(
                    "Message was send to email %s on %s",
                    email,
                    userToActivateDb.get().getCreateDate()
            ));
        }

        if (userRepository.findByEmail(email).isPresent()) {
            throw new AlreadyExistException(EMAIL_EXIST_MESSAGE);
        }

        final String code = mailSenderService.sendActivationMail(email, role);
        final ClientCompany clientCompany = clientCompanyRepository.getOne(companyId);

        final ActivationDetails activationDetails = ActivationDetails.builder()
                .email(email)
                .role(Role.RoleType.valueOf(role))
                .activationCode(code)
                .isActive(false)
                .clientCompany(clientCompany)
                .build();

        final ActivationDetails userSave = activationDetailsRepository.save(activationDetails);
        log.info("Activation details have been saved {}", userSave);

    }


    @Override
    public void update(UserUpdateRequest request) throws NotFoundException {

        final Long companyId = jwtTokenUtil.getCurrentCompanyId();
        final Long id = request.getId();
        final String password = request.getPassword();

        User user = userRepository
                .findByIdAndClientCompanyId(id, companyId)
                .filter(u -> !u.getStatus().equals(User.Status.DELETED))
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND_MESSAGE));

        if (password != null && !password.trim().isEmpty()) {
            user.setPassword(passwordEncoder.encode(password));
        }

        user.setName(request.getName());
        user.setSurname(request.getSurname());
        user.setPatronymic(request.getPatronymic());

        Set<Role> rolesDb = request.getRoles()
                .stream()
                .map(r -> roleRepository.getByRole(Role.RoleType.valueOf(r)))
                .collect(Collectors.toSet());

        user.setRoles(rolesDb);
        user.setBirthday(request.getBirthday());
        user.setAddress(request.getAddress());
        user.setPassport(request.getPassport());
        user.setStatus(User.Status.valueOf(request.getStatus()));
        user.setPhone(request.getPhone());

        log.info("User has been updated {}", user);

    }

    @Override
    public void delete(long id) throws NotFoundException {
        final long companyId = jwtTokenUtil.getCurrentCompanyId();
        userRepository.findByIdAndClientCompanyId(id, companyId)
                .map(user -> {
                    user.setStatus(User.Status.DELETED);
                    log.info("User has been deleted {}", user);
                    return user;
                })
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND_MESSAGE));
    }

    @Override
    public void updatePhoto(PhotoRequest photoRequest, long userId) throws NotFoundException {

        if (userId < 0) {
            userId = jwtTokenUtil.getJwtUser().getId();
        }

        final long companyId = jwtTokenUtil.getCurrentCompanyId();
        User currentUser = userRepository.findByIdAndClientCompanyId(userId, companyId)
                .filter(user -> !user.getStatus().equals(User.Status.DELETED))
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND_MESSAGE));

        awss3Service.uploadFile(photoRequest.getPhoto(), String.valueOf(userId));
        currentUser.setPhoto(awss3Service.getFile(currentUser.getId().toString()));
        log.info("User's photo has been save {}", currentUser);
    }

    @Override
    public void updatePhone(PhoneRequest phoneRequest) throws NotFoundException {
        final long userId = jwtTokenUtil.getJwtUser().getId();
        final long companyId = jwtTokenUtil.getCurrentCompanyId();
        User currentUser = userRepository.findByIdAndClientCompanyId(userId, companyId)
                .filter(user -> !user.getStatus().equals(User.Status.DELETED))
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND_MESSAGE));

        currentUser.setPhone(phoneRequest.getPhone());
        log.info("User's phone has been save {}", currentUser);
    }

    @Override
    public void updatePassword(PasswordRequest passwordRequest) throws IncorrectPasswordException {

        final String currentPassword = jwtTokenUtil.getJwtUser().getPassword();
        final String oldPassword = passwordRequest.getOldPassword();
        final String newPassword = passwordRequest.getNewPassword();
        final String confirmNewPassword = passwordRequest.getConfirmNewPassword();

        final boolean matches = passwordEncoder.matches(oldPassword, currentPassword);

        if (!matches) {
            throw new IncorrectPasswordException("Old password is incorrect");
        }

        if (!newPassword.equals(confirmNewPassword)) {
            throw new IncorrectPasswordException("New password doesn't match with confirm password");
        }

        final long userId = jwtTokenUtil.getJwtUser().getId();
        final long companyId = jwtTokenUtil.getCurrentCompanyId();

        userRepository.findByIdAndClientCompanyId(userId, companyId)
                .filter(user -> !user.getStatus().equals(User.Status.DELETED))
                .map(user -> {
                    user.setPassword(passwordEncoder.encode(newPassword));
                    return user;
                });
    }

}
