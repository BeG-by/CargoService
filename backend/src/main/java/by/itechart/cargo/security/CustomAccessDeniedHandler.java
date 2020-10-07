package by.itechart.cargo.security;

import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
public class CustomAccessDeniedHandler implements AccessDeniedHandler {

    @Value("${jwt.token.header}")
    private String header;

    @SneakyThrows
    @Override
    public void handle(HttpServletRequest req, HttpServletResponse res, AccessDeniedException e) {
        res.setContentType("application/json");
        res.setStatus(HttpServletResponse.SC_FORBIDDEN);
        res.getWriter().write("User is not authorized. Access denied");

        log.debug("Access denied. Request: [{} {}] Token: {}", req.getMethod(), req.getRequestURI(), req.getHeader(header));

    }

}