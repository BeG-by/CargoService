package by.itechart.cargo.security;

import by.itechart.cargo.model.Role;
import by.itechart.cargo.model.User;
import by.itechart.cargo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class JwtUserDetailServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public JwtUserDetailServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {

        User user = userRepository.findByLogin(login)
                .orElseThrow(() -> new UsernameNotFoundException(String.format("User with login %s doesn't exist", login)));


        return JwtUserDetails.builder()
                .id(user.getId())
                .login(user.getLogin())
                .password(user.getPassword())
                .name(user.getName())
                .surname(user.getSurname())
                .patronymic(user.getPatronymic())
                .birthday(user.getBirthday())
                .address(user.getAddress())
                .email(user.getEmail())
                .passport(user.getPassport())
                .status(user.getStatus())
                .clientCompany(user.getClientCompany())
                .roles(user.getRoles())
                .phone(user.getPhone())
                .photo(user.getPhoto())
                .authorities(createGrantedAuthority(user.getRoles()))
                .isEnable(user.getStatus().equals(User.Status.ACTIVE))
                .build();
    }


    private List<GrantedAuthority> createGrantedAuthority(Set<Role> roles) {
        return roles.stream().map(r -> new SimpleGrantedAuthority("ROLE_" + r.getRole().toString())).collect(Collectors.toList());
    }

}
