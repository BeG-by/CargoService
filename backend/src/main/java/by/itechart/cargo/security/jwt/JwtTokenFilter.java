package by.itechart.cargo.security.jwt;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class JwtTokenFilter extends GenericFilterBean {

    private JwtTokenUtil jwtTokenUtil;
    private boolean isRequest;

    @Autowired
    public JwtTokenFilter(JwtTokenUtil jwtTokenUtil) {
        this.jwtTokenUtil = jwtTokenUtil;
        isRequest = true;
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain filterChain) throws IOException, ServletException {


        if (!isRequest) {
            isRequest = true;
            filterChain.doFilter(req, resp);
            return;
        }

        final String token = jwtTokenUtil.resolveToken((HttpServletRequest) req);

        try {

            if (token != null && jwtTokenUtil.validateToken(token)) {

                Authentication auth = jwtTokenUtil.getAuthentication(token);
                if (auth != null) {
                    SecurityContextHolder.getContext().setAuthentication(auth);
                }

                isRequest = false;

            }

            filterChain.doFilter(req, resp);

        } catch (IllegalArgumentException e) {
            SecurityContextHolder.clearContext();
            resp.getWriter().write("Authorization header doesn't exist or token is invalid");
            ((HttpServletResponse) resp).setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            log.debug("User is not authenticated: method: {}, url: {}", ((HttpServletRequest) req).getMethod(), ((HttpServletRequest) req).getRequestURI());
        }

    }

}
