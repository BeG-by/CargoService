package by.itechart.cargo.security.jwt;

import by.itechart.cargo.model.Role;
import by.itechart.cargo.model.User;
import by.itechart.cargo.repository.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;
import java.util.Set;

public class JwtUserDetailService implements UserDetailsService {

    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {

        User user = userRepository.findByLogin(login)
                .orElseThrow(() -> new UsernameNotFoundException(String.format("User with login %s doesn't exist", login)));

        return JwtUser.builder()
                .id(user.getUserId())
                .login(user.getLogin())
                .password(user.getPassword())
                .authorities(createGrantedAuthority(user.getRoles()))
                .build();
    }


    private List<GrantedAuthority> createGrantedAuthority(Set<Role> userRole) {
        return null;
    }

}
