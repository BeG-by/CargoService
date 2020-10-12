package by.itechart.cargo.dto.model_dto.user;

import by.itechart.cargo.model.Address;
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
    private String email;
    private String name;
    private String surname;
    private String patronymic;
    private LocalDate birthday;
    private Address address;
    private String phone;
    private String photo;
    private String passport;
    private String status;
    private Set<String> roles;
    private boolean isOnline;

    public static UserResponse toUserResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .surname(user.getSurname())
                .patronymic(user.getPatronymic())
                .birthday(user.getBirthday())
                .phone(user.getPhone())
                .photo(user.getPhoto())
                .address(user.getAddress())
                .passport(user.getPassport())
                .status(user.getStatus().toString())
                .roles(user.getRoles()
                        .stream()
                        .map(r-> r.getRole().toString())
                        .collect(Collectors.toSet()))
                .isOnline(user.isOnline())
                .build();
    }

}
