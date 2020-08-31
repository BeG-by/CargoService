package by.itechart.cargo.security.jwt;

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

    private UserRepository userRepository;

    @Autowired
    public JwtUserDetailServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {

        User user = userRepository.findByLogin(login)
                .orElseThrow(() -> new UsernameNotFoundException(String.format("User with login %s doesn't exist", login)));

        //todo: fix address creating
        return JwtUserDetails.builder()
                .id(user.getId())
                .login(user.getLogin())
                .password(user.getPassword())
                .name(user.getName())
                .surname(user.getSurname())
                .patronymic(user.getPatronymic())
                .birthday(user.getBirthday())
                .city(user.getAddress() == null ? null : user.getAddress().getCity())
                .street(user.getAddress() == null ? null : user.getAddress().getStreet())
                .house(user.getAddress() == null ? null : user.getAddress().getHouse())
                .flat(user.getAddress() == null ? null : user.getAddress().getFlat())
                .email(user.getAddress() == null ? null : user.getEmail())
                .clientCompany(user.getClientCompany())
                .authorities(createGrantedAuthority(user.getRoles()))
                .isEnable(true)
                .build();
    }


    private List<GrantedAuthority> createGrantedAuthority(Set<Role> roles) {
        return roles.stream().map(r -> new SimpleGrantedAuthority(r.getRole().toString())).collect(Collectors.toList());
    }

}
