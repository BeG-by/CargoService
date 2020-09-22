package by.itechart.cargo.dto.model_dto.user;

import by.itechart.cargo.model.Address;
import by.itechart.cargo.model.Role;
import by.itechart.cargo.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Set;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponse {

    private Long id;
    private String login;
    private String name;
    private String surname;
    private String patronymic;
    private LocalDate birthday;
    private Address address;
    private String email;
    private Set<String> roles;


    public static UserResponse toUserResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .login(user.getLogin())
                .name(user.getName())
                .surname(user.getSurname())
                .patronymic(user.getPatronymic())
                .birthday(user.getBirthday())
                .address(user.getAddress())
                .email(user.getEmail())
                .roles(user.getRoles()
                        .stream()
                        .map(r-> r.getRole().toString())
                        .collect(Collectors.toSet()))
                .build();
    }

}
