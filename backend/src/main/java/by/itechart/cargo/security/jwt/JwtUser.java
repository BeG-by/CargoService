package by.itechart.cargo.security.jwt;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@Builder
public class JwtUser implements UserDetails {

    private long id;
    private String login;
    private String password;
    private Collection<? extends GrantedAuthority> authorities;
    private boolean isEnable;

    public JwtUser(long id, String login, String password, Collection<? extends GrantedAuthority> authorities, boolean isEnable) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.authorities = authorities;
        this.isEnable = isEnable;
    }

    public long getId() {
        return id;
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
        return false;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @JsonIgnore
    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @JsonIgnore // TODO
    @Override
    public boolean isEnabled() {
        return isEnable;
    }

}
