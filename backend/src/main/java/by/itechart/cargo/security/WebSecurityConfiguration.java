package by.itechart.cargo.security;


import by.itechart.cargo.security.jwt.JwtTokenFilter;
import by.itechart.cargo.security.jwt.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.CommonsRequestLoggingFilter;

import javax.servlet.http.HttpServletRequest;


@EnableWebSecurity
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

    private final JwtTokenUtil jwtTokenUtil;

    @Autowired
    public WebSecurityConfiguration(JwtTokenUtil jwtTokenUtil) {
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    JwtTokenFilter jwtTokenFilterBean() {
        return new JwtTokenFilter(jwtTokenUtil);
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    // TODO create config directory
    @Bean
    public CommonsRequestLoggingFilter logFilter() {

        CommonsRequestLoggingFilter filter = new CommonsRequestLoggingFilter();

        filter.setIncludeQueryString(true);
        filter.setIncludePayload(true);
        filter.setIncludeHeaders(true);
        filter.setMaxPayloadLength(10000);
        return filter;
    }


    // TODO roles configurations
    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .httpBasic().disable()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers("/v1/api/auth/login").permitAll()
                .anyRequest().authenticated()
                .and()
                .addFilterBefore(jwtTokenFilterBean(), UsernamePasswordAuthenticationFilter.class);
    }

}
