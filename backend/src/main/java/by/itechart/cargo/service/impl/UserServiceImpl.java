package by.itechart.cargo.service.impl;

import by.itechart.cargo.dto.model_dto.user.UserInfoResponse;
import by.itechart.cargo.dto.model_dto.user.UserRequest;
import by.itechart.cargo.dto.model_dto.user.UserResponse;
import by.itechart.cargo.exception.AlreadyExistException;
import by.itechart.cargo.model.ClientCompany;
import by.itechart.cargo.model.Role;
import by.itechart.cargo.model.User;
import by.itechart.cargo.repository.ClientCompanyRepository;
import by.itechart.cargo.repository.RoleRepository;
import by.itechart.cargo.repository.UserRepository;
import by.itechart.cargo.security.jwt.JwtTokenUtil;
import by.itechart.cargo.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static by.itechart.cargo.service.constant.MessageConstant.EMAIL_EXIST_MESSAGE;
import static by.itechart.cargo.service.constant.MessageConstant.LOGIN_ALREADY_EXISTS;

@Service
@Transactional
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ClientCompanyRepository clientCompanyRepository;
    private final RoleRepository roleRepository;
    private final JwtTokenUtil jwtTokenUtil;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, ClientCompanyRepository clientCompanyRepository, RoleRepository roleRepository, JwtTokenUtil jwtTokenUtil, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.clientCompanyRepository = clientCompanyRepository;
        this.roleRepository = roleRepository;
        this.jwtTokenUtil = jwtTokenUtil;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserInfoResponse findInfo() {
        final User authUser = jwtTokenUtil.getJwtUser().toUser();
        final Long companyId = jwtTokenUtil.getJwtUser().getClientCompany().getId();
        final ClientCompany clientCompany = clientCompanyRepository.findById(companyId).orElse(new ClientCompany());
        return new UserInfoResponse(UserResponse.toUserResponse(authUser), clientCompany);
    }

    @Override
    public List<UserResponse> findAll() {
        final Long companyId = jwtTokenUtil.getJwtUser().getClientCompany().getId();
        return userRepository.findByClientCompanyId(companyId).stream().map(UserResponse::toUserResponse).collect(Collectors.toList());
    }

    @Override
    public void saveOne(UserRequest userRequest) throws AlreadyExistException {

        final Long companyId = jwtTokenUtil.getJwtUser().getClientCompany().getId();
        final String login = userRequest.getLogin();
        final String email = userRequest.getEmail();

        if (userRepository.getByLogin(login).isPresent()) {
            throw new AlreadyExistException(LOGIN_ALREADY_EXISTS);
        }

        if (email != null && userRepository.getByEmail(email).isPresent()) {
            throw new AlreadyExistException(EMAIL_EXIST_MESSAGE);
        }

        Set<Role> rolesDb = userRequest.getRoles()
                .stream()
                .map(r -> roleRepository.getByRole(Role.RoleType.valueOf(r)))
                .collect(Collectors.toSet());

        final User user = userRequest.toUser();
        user.setRoles(rolesDb);
        user.setClientCompany(clientCompanyRepository.getOne(companyId));
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        User userDb = userRepository.save(user);
        log.info("User has been saved {}", userDb);
    }

}
