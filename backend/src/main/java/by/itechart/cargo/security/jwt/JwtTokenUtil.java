package by.itechart.cargo.security.jwt;

import by.itechart.cargo.model.Role;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.util.Base64;
import java.util.Date;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class JwtTokenUtil {

    private final UserDetailsService userDetailsService;

    @Value("${jwt.token.secret}")
    private String secretKey;

    @Value("${jwt.token.expiration}")
    private long validityInMinutes;

    private long validityInMs;

    @Value("${jwt.token.header}")
    private String header;


    @Autowired
    public JwtTokenUtil(@Qualifier("jwtUserDetailServiceImpl") UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
        validityInMs = validityInMinutes * 60000;
    }


    public String createToken(String login, Set<Role> roles) {

        final Claims claims = Jwts.claims().setSubject(login);

        final Set<String> rolesName = roles.stream().map(r -> r.getRole().toString()).collect(Collectors.toSet());
        claims.put("roles", rolesName);

        Date now = new Date();
        Date periodOfValidity = new Date(now.getTime() + validityInMs);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(periodOfValidity)
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public Authentication getAuthentication(String token) {
        String login = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
        UserDetails userDetails = userDetailsService.loadUserByUsername(login);
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    public String resolveToken(HttpServletRequest req) {
        return req.getHeader(header);
    }

    public boolean validateToken(String token) {

        try {

            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return claims.getBody().getExpiration().after(new Date());

        } catch (JwtException | IllegalArgumentException e) {
            throw new IllegalArgumentException("JWT token is expired or invalid");
        }
    }

    public JwtUserDetails getJwtUser() {
        return (JwtUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    public long getCurrentCompanyId() {
        final JwtUserDetails currentUser = (JwtUserDetails) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();
        return currentUser.getClientCompany().getId();
    }

}


