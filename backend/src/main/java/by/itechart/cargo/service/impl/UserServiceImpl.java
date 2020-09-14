package by.itechart.cargo.service.impl;

import by.itechart.cargo.dto.model_dto.user.UserRequest;
import by.itechart.cargo.exception.AlreadyExistException;
import by.itechart.cargo.exception.NotFoundException;
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

import static by.itechart.cargo.service.constant.MessageConstant.USER_EXIST_MESSAGE;
import static by.itechart.cargo.service.constant.MessageConstant.USER_NOT_FOUND_MESSAGE;

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
    public User findByLogin(String login) throws NotFoundException {
        return userRepository.findByLogin(login).orElseThrow(() -> new NotFoundException(USER_NOT_FOUND_MESSAGE));
    }

    @Override
    public List<User> findAll() {
        final Long companyId = jwtTokenUtil.getJwtUser().getClientCompany().getId();
        return userRepository.findByClientCompanyId(companyId);
    }

    @Override
    public void saveOne(UserRequest userRequest) throws AlreadyExistException {

        final Long companyId = jwtTokenUtil.getJwtUser().getClientCompany().getId();
        final String login = userRequest.getLogin();

        if (userRepository.findByLogin(login).isPresent()) {
            throw new AlreadyExistException(USER_EXIST_MESSAGE);
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
