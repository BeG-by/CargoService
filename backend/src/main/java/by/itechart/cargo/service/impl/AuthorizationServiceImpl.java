package by.itechart.cargo.service.impl;

import by.itechart.cargo.dto.authorization_dto.AuthorizationRequest;
import by.itechart.cargo.dto.authorization_dto.AuthorizationResponse;
import by.itechart.cargo.dto.model_dto.client_company.ClientCompanyDTO;
import by.itechart.cargo.dto.model_dto.user.UserResponse;
import by.itechart.cargo.dto.model_dto.user.UserSaveRequest;
import by.itechart.cargo.exception.AlreadyExistException;
import by.itechart.cargo.exception.IncorrectPasswordException;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.model.ActivationDetails;
import by.itechart.cargo.model.Role;
import by.itechart.cargo.model.User;
import by.itechart.cargo.repository.ActivationDetailsRepository;
import by.itechart.cargo.repository.RoleRepository;
import by.itechart.cargo.repository.UserRepository;
import by.itechart.cargo.security.JwtTokenUtil;
import by.itechart.cargo.service.AuthorizationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashSet;

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

    @Autowired
    public AuthorizationServiceImpl(UserRepository userRepository,
                                    JwtTokenUtil jwtTokenUtil,
                                    AuthenticationManager authenticationManager,
                                    ActivationDetailsRepository activationDetailsRepository,
                                    RoleRepository roleRepository,
                                    PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.jwtTokenUtil = jwtTokenUtil;
        this.authenticationManager = authenticationManager;
        this.activationDetailsRepository = activationDetailsRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
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


}
