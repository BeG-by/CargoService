package by.itechart.cargo.security.jwt;

import by.itechart.cargo.model.ClientCompany;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Collection;

@Getter
@ToString
@Builder
public class JwtUserDetails implements UserDetails {

    private long id;
    private String login;
    private String password;
    private String name;
    private String surname;
    private String patronymic;
    private LocalDate birthday;
    private String city;
    private String street;
    private String house;
    private String flat;
    private String email;
    private ClientCompany clientCompany;
    private Collection<? extends GrantedAuthority> authorities;
    private boolean isEnable;


    public JwtUserDetails(long id,
                          String login,
                          String password,
                          String name,
                          String surname,
                          String patronymic,
                          LocalDate birthday,
                          String city,
                          String street,
                          String house,
                          String flat,
                          String email,
                          ClientCompany clientCompany,
                          Collection<? extends GrantedAuthority> authorities,
                          boolean isEnable) {

        this.id = id;
        this.login = login;
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.patronymic = patronymic;
        this.birthday = birthday;
        this.city = city;
        this.street = street;
        this.house = house;
        this.flat = flat;
        this.email = email;
        this.clientCompany = clientCompany;
        this.authorities = authorities;
        this.isEnable = isEnable;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return login;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @JsonIgnore // TODO
    @Override
    public boolean isEnabled() {
        return isEnable;
    }

}
