package by.itechart.cargo.service.impl;

import by.itechart.cargo.dto.authorization_dto.AuthorizationRequest;
import by.itechart.cargo.dto.authorization_dto.AuthorizationResponse;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.model.User;
import by.itechart.cargo.repository.UserRepository;
import by.itechart.cargo.security.jwt.JwtTokenUtil;
import by.itechart.cargo.service.AuthorizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.util.Set;
import java.util.stream.Collectors;

import static by.itechart.cargo.service.constant.MessageConstant.USER_NOT_FOUND_MESSAGE;


@Service
@Transactional
public class AuthorizationServiceImpl implements AuthorizationService {

    private final UserRepository userRepository;
    private final JwtTokenUtil jwtTokenUtil;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public AuthorizationServiceImpl(UserRepository userRepository,
                                    JwtTokenUtil jwtTokenUtil,
                                    AuthenticationManager authenticationManager) {

        this.userRepository = userRepository;
        this.jwtTokenUtil = jwtTokenUtil;
        this.authenticationManager = authenticationManager;
    }


    @Override
    public AuthorizationResponse login(AuthorizationRequest request) throws NotFoundException {
        
        final String login = request.getLogin();
        final String password = request.getPassword();

        final User user = userRepository.findByLogin(login).orElseThrow(() -> new NotFoundException(USER_NOT_FOUND_MESSAGE));
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(login, password));
        final String token = jwtTokenUtil.createToken(login, user.getRoles());

        final Set<String> rolesNames = user.getRoles().stream().map(r -> r.getRole().toString()).collect(Collectors.toSet());

        return new AuthorizationResponse(rolesNames, token);

    }


    @Override
    public void logout(HttpServletRequest req, HttpServletResponse resp) {
        SecurityContextLogoutHandler securityContextLogoutHandler = new SecurityContextLogoutHandler();
        securityContextLogoutHandler.logout(req, resp, null);
    }

}
