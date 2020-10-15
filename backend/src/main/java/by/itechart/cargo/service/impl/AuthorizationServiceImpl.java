package by.itechart.cargo.service.impl;

import by.itechart.cargo.dto.authorization_dto.AuthorizationRequest;
import by.itechart.cargo.dto.authorization_dto.AuthorizationResponse;
import by.itechart.cargo.dto.authorization_dto.ResetPasswordRequest;
import by.itechart.cargo.dto.model_dto.client_company.ClientCompanyDTO;
import by.itechart.cargo.dto.model_dto.user.UserResponse;
import by.itechart.cargo.dto.model_dto.user.UserSaveRequest;
import by.itechart.cargo.exception.AlreadyExistException;
import by.itechart.cargo.exception.IncorrectPasswordException;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.exception.ServiceException;
import by.itechart.cargo.model.ActivationDetails;
import by.itechart.cargo.model.ResetPasswordDetails;
import by.itechart.cargo.model.Role;
import by.itechart.cargo.model.User;
import by.itechart.cargo.repository.ActivationDetailsRepository;
import by.itechart.cargo.repository.ResetPasswordDetailsRepository;
import by.itechart.cargo.repository.RoleRepository;
import by.itechart.cargo.repository.UserRepository;
import by.itechart.cargo.security.JwtTokenUtil;
import by.itechart.cargo.service.AuthorizationService;
import by.itechart.cargo.service.MailSenderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.Optional;

import static by.itechart.cargo.service.util.MessageConstant.EMAIL_EXIST_MESSAGE;
import static by.itechart.cargo.service.util.MessageConstant.USER_NOT_FOUND_MESSAGE;


@Service
@Slf4j
@Transactional
public class AuthorizationServiceImpl implements AuthorizationService {

    private final UserRepository userRepository;
    private final JwtTokenUtil jwtTokenUtil;
    private final AuthenticationManager authenticationManager;
    private final ActivationDetailsRepository activationDetailsRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final MailSenderService mailSenderService;
    private final ResetPasswordDetailsRepository resetPasswordDetailsRepository;

    @Autowired
    public AuthorizationServiceImpl(UserRepository userRepository,
                                    JwtTokenUtil jwtTokenUtil,
                                    AuthenticationManager authenticationManager,
                                    ActivationDetailsRepository activationDetailsRepository,
                                    RoleRepository roleRepository,
                                    PasswordEncoder passwordEncoder,
                                    MailSenderService mailSenderService,
                                    ResetPasswordDetailsRepository resetPasswordDetailsRepository) {

        this.userRepository = userRepository;
        this.jwtTokenUtil = jwtTokenUtil;
        this.authenticationManager = authenticationManager;
        this.activationDetailsRepository = activationDetailsRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.mailSenderService = mailSenderService;
        this.resetPasswordDetailsRepository = resetPasswordDetailsRepository;
    }


    @Override
    public AuthorizationResponse login(AuthorizationRequest request) throws NotFoundException {

        final String email = request.getEmail();
        final String password = request.getPassword();

        final User user = userRepository.findByEmail(email).orElseThrow(() -> new NotFoundException(USER_NOT_FOUND_MESSAGE));
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        final String token = jwtTokenUtil.createToken(email, user.getRoles());
        user.setOnline(true);

        final UserResponse userResponse = UserResponse.toUserResponse(user);

        return new AuthorizationResponse(token, userResponse, ClientCompanyDTO.fromClientCompany(user.getClientCompany()));

    }

    @Override
    public void logout() {
        final long userId = jwtTokenUtil.getJwtUser().getId();
        userRepository.findById(userId).ifPresent(u -> u.setOnline(false));
        log.info("User with id = {} logouted", userId);

    }

    @Override
    public void registration(UserSaveRequest request) throws NotFoundException, AlreadyExistException, IncorrectPasswordException {

        final String activationCode = request.getActivationCode();

        final ActivationDetails activationDetails = activationDetailsRepository
                .findByActivationCode(activationCode)
                .filter(details -> !details.isActive())
                .orElseThrow(() -> new NotFoundException("Access denied. You don't have the right to register in the system."));

        final String password = request.getPassword();
        final String confirmPassword = request.getConfirmPassword();

        if (!password.equals(confirmPassword)) {
            throw new IncorrectPasswordException("Passwords don't match");
        }

        final String email = activationDetails.getEmail();

        if (userRepository.findByEmail(email).isPresent()) {
            throw new AlreadyExistException(EMAIL_EXIST_MESSAGE);
        }

        final Role.RoleType role = activationDetails.getRole();
        final Role roleDb = roleRepository.getByRole(role);

        final HashSet<Role> roles = new HashSet<>();
        roles.add(roleDb);

        final User user = request.toUser();
        user.setEmail(activationDetails.getEmail());
        user.setRoles(roles);
        user.setClientCompany(activationDetails.getClientCompany());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setStatus(User.Status.ACTIVE);
        activationDetails.setActive(true);

        User userDb = userRepository.save(user);

        log.info("User has been registered {}", userDb);

    }

    @Override
    public void resetPassword(String email) throws NotFoundException, ServiceException, AlreadyExistException {

        final User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException(String.format("Email %s doesn't exist in the system", email)));

        final Optional<ResetPasswordDetails> details = resetPasswordDetailsRepository
                .findByEmail(email);

        if (details.isPresent() && !details.get().isReset()) {
            throw new AlreadyExistException(String.format("Instructions was sent to email %s in %s ",
                    email,
                    details.get().getLastModified()));
        } else if (details.isPresent()) {

            final String code = mailSenderService.sendResetPasswordMail(email, user);
            details.get().setActivationCode(code);
            details.get().setReset(false);
            log.info("Password details for resetting has been updated {}", details.get());

        } else {
            final String code = mailSenderService.sendResetPasswordMail(email, user);
            final ResetPasswordDetails resetPasswordDetails = ResetPasswordDetails.builder()
                    .activationCode(code)
                    .email(email)
                    .isReset(false)
                    .build();
            final ResetPasswordDetails resetPasswordDetailsDb = resetPasswordDetailsRepository.save(resetPasswordDetails);
            log.info("Password details for resetting has been saved {}", resetPasswordDetailsDb);
        }


    }

    @Override
    public void resetPassword(ResetPasswordRequest request) throws IncorrectPasswordException, NotFoundException {

        final String password = request.getPassword();
        final String confirm = request.getConfirm();
        final String code = request.getCode();

        if (!password.equals(confirm)) {
            throw new IncorrectPasswordException("Password doesn't match with confirm password");
        }

        final ResetPasswordDetails detailsDb = resetPasswordDetailsRepository.findByActivationCode(code)
                .filter(details -> !details.isReset())
                .orElseThrow(() -> new NotFoundException("Access denied. You don't have the rights."));


        userRepository.findByEmail(detailsDb.getEmail())
                .filter(user -> !user.getStatus().equals(User.Status.DELETED))
                .map(user -> {
                    user.setPassword(passwordEncoder.encode(password));
                    log.info("Password has been change {}", user);
                    return user;
                })
                .orElseThrow(() -> new NotFoundException(String.format("User with email %s doesn't exist", detailsDb.getEmail())));

        detailsDb.setReset(true);

    }

}
