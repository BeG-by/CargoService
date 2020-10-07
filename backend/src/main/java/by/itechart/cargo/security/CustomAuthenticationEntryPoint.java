package by.itechart.cargo.security;

import lombok.SneakyThrows;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@Slf4j
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Value("${jwt.token.header}")
    private String header;

    @SneakyThrows
    @Override
    public void commence(HttpServletRequest req, HttpServletResponse res, AuthenticationException e) {
        res.setContentType("application/json");
        res.setStatus(res.SC_UNAUTHORIZED);

        String message = "Authentication failed";

        if (e.getClass() == BadCredentialsException.class) {
            message = "Authentication failed. Please check your password";
        } else if (e.getClass() == DisabledException.class) {
            message = "Authentication failed. User is blocked";
        }

        res.getWriter().write(message);

        log.debug("{}. Request: [{} {}] Token: {}", message, req.getMethod(), req.getRequestURI(), req.getHeader(header));

    }

}
