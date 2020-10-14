package by.itechart.cargo.config;


import by.itechart.cargo.security.CustomAccessDeniedHandler;
import by.itechart.cargo.security.CustomAuthenticationEntryPoint;
import by.itechart.cargo.security.JwtTokenFilter;
import by.itechart.cargo.security.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true)
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
    public JwtTokenFilter jwtTokenFilterBean() {
        return new JwtTokenFilter(jwtTokenUtil);
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public AuthenticationEntryPoint customEntryPointBean() {
        return new CustomAuthenticationEntryPoint();
    }

    @Bean
    public AccessDeniedHandler customAccessDeniedHandlerBean() {
        return new CustomAccessDeniedHandler();
    }


    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .httpBasic().disable()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers("/v1/api/auth/login", "/v1/api/auth/registration", "/v1/api/auth/password", "/v1/api/auth/mail", "/ws/**").permitAll()
                .antMatchers(HttpMethod.POST, "/ws/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .addFilterBefore(jwtTokenFilterBean(), UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling().authenticationEntryPoint(customEntryPointBean())
                .and()
                .exceptionHandling().accessDeniedHandler(customAccessDeniedHandlerBean());
    }

}
