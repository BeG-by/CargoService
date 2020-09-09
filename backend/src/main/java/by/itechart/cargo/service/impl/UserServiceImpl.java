package by.itechart.cargo.service.impl;

import by.itechart.cargo.dto.model_dto.UserRequest;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.model.User;
import by.itechart.cargo.repository.ClientCompanyRepository;
import by.itechart.cargo.repository.UserRepository;
import by.itechart.cargo.security.jwt.JwtTokenUtil;
import by.itechart.cargo.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

import static by.itechart.cargo.service.constant.MessageConstant.USER_NOT_FOUND_MESSAGE;

@Service
@Transactional
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ClientCompanyRepository clientCompanyRepository;
    private final JwtTokenUtil jwtTokenUtil;

    public UserServiceImpl(UserRepository userRepository, ClientCompanyRepository clientCompanyRepository, JwtTokenUtil jwtTokenUtil) {
        this.userRepository = userRepository;
        this.clientCompanyRepository = clientCompanyRepository;
        this.jwtTokenUtil = jwtTokenUtil;
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
    public void saveOne(UserRequest userRequest) {

        final Long companyId = jwtTokenUtil.getJwtUser().getClientCompany().getId();

        final User user = userRequest.toUser();
        user.setClientCompany(clientCompanyRepository.getOne(companyId));

        User userDb = userRepository.save(user);
        log.info("User has been saved {}", userDb);
    }

}
