package by.itechart.cargo.service.impl;

import by.itechart.cargo.dto.authorization_dto.AuthorizationRequest;
import by.itechart.cargo.dto.authorization_dto.AuthorizationResponse;
import by.itechart.cargo.dto.authorization_dto.Oauth2Request;
import by.itechart.cargo.dto.authorization_dto.ResetPasswordRequest;
import by.itechart.cargo.dto.model_dto.client_company.ClientCompanyDTO;
import by.itechart.cargo.dto.model_dto.user.UserResponse;
import by.itechart.cargo.dto.model_dto.user.UserSaveRequest;
import by.itechart.cargo.exception.*;
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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.apache.tomcat.util.codec.binary.Base64;

import javax.transaction.Transactional;
import java.util.*;

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

    @Value("${spring.security.oauth2.client.provider.google.user-info-uri}")
    private String googleUserInfoURI;

    @Value("${spring.security.oauth2.client.registration.github.client-id}")
    private String githubClientId;

    @Value("${spring.security.oauth2.client.registration.github.client-secret}")
    private String githubClientSecret;

    @Value("${spring.security.oauth2.client.provider.github.token-uri}")
    private String githubTokenURI;

    @Value("${spring.security.oauth2.client.provider.github.user-info-uri}")
    private String gitHubUserURI;

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

    @Override
    public AuthorizationResponse oauth2GoogleLogin(Oauth2Request request) throws NotFoundException, EmailsNotMatchException {

        String email = request.getEmail();
        String accessToken = request.getAccessToken();

        User user = userRepository.findByEmail(email).orElseThrow(() -> new NotFoundException(USER_NOT_FOUND_MESSAGE));

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer" + accessToken);

        HttpEntity<String> requestToGoogle = new HttpEntity<>(headers);

        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<Object> responseEntity = restTemplate.exchange(googleUserInfoURI, HttpMethod.GET, requestToGoogle, Object.class);
        Map<String, String> info = (Map<String, String>) responseEntity.getBody();

        if (!email.equals(info.get("email"))) {
            throw new EmailsNotMatchException("Unauthorized");
        }

        final String token = jwtTokenUtil.createToken(email, user.getRoles());
        user.setOnline(true);

        return new AuthorizationResponse(token, UserResponse.toUserResponse(user), ClientCompanyDTO.fromClientCompany(user.getClientCompany()));
    }

    @Override
    public String oauth2GitHubLogin(String authCode) throws NotFoundException {

        String accessToken = getAccessTokenGithub(authCode);
        String email = getUserInfoGithub(accessToken);

        User user = userRepository.findByEmail(email).orElseThrow(() -> new NotFoundException(USER_NOT_FOUND_MESSAGE));
        String token = jwtTokenUtil.createToken(user.getEmail(), user.getRoles());
        user.setOnline(true);

        return token;
    }


    private String getAccessTokenGithub(String authCode) {
        String credentials = githubClientId + ":" + githubClientSecret;
        String encodedCredentials = new String(Base64.encodeBase64(credentials.getBytes()));

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Basic " + encodedCredentials);

        HttpEntity<String> request = new HttpEntity<>(headers);

        String access_token_url = githubTokenURI +
                "?code=" + authCode +
                "&grant_type=authorization_code";

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Object> responseEntity = restTemplate.exchange(access_token_url, HttpMethod.POST, request, Object.class);
        Map<String, String> tokenResponse = (Map<String, String>) responseEntity.getBody();

        log.info("Access token from gitHub has been received {}", tokenResponse);

        return tokenResponse.get("access_token");

    }


    private String getUserInfoGithub(String accessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "token " + accessToken);

        HttpEntity<String> request = new HttpEntity<>(headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Object> responseEntity = restTemplate.exchange(gitHubUserURI, HttpMethod.GET, request, Object.class);
        ArrayList<Map<String, String>> emails = (ArrayList<Map<String, String>>) responseEntity.getBody();

        log.info("Info about user by access token has been received {}", emails);

        return emails.get(0).get("email");
    }

}
