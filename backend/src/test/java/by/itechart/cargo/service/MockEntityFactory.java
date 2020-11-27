package by.itechart.cargo.service;

import by.itechart.cargo.model.Address;
import by.itechart.cargo.model.ClientCompany;
import by.itechart.cargo.model.Role;
import by.itechart.cargo.model.User;
import by.itechart.cargo.security.JwtUserDetails;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class MockEntityFactory {

    public static User getMockUser() {
        User user = getMockJwtUser().toUser();
        user.setOnline(true);
        return user;
    }

    public static JwtUserDetails getMockJwtUser() {

        Set<Role> roleSet = new HashSet<>() {
            {
                add(Role.builder()
                        .roleId(4)
                        .role(Role.RoleType.ADMIN)
                        .build());
            }
        };

        return JwtUserDetails.builder()
                .id(-1L)
                .name("NameMock")
                .surname("SurnameMock")
                .patronymic("PatronymicMock")
                .email("UserEmailMock@gmail.com")
                .birthday(LocalDate.of(1995, 1, 1))
                .photo("mockUrl")
                .phone("12345")
                .address(getMockAddress())
                .password("mockPassword")
                .passport("MP123456789")
                .status(User.Status.ACTIVE)
                .roles(roleSet)
                .build();

    }


    public static Address getMockAddress() {
        return new Address("Belarus", "Minsk", "MockStreet", "1", " 1");
    }

    public static ClientCompany getMockCompany() {
        return ClientCompany.builder()
                .name("CompanyMock")
                .email("CompanyEmailMock@gmail.com")
                .payerAccountNumber("111222333")
                .type(ClientCompany.CompanyType.JP)
                .registrationDate(LocalDate.of(2000, 1, 1))
                .status(ClientCompany.Status.ACTIVE)
                .address(getMockAddress())
                .users(new ArrayList<>())
                .build();
    }


    public static List<User> getUserList() {

        User mockUser1 = getMockUser();
        User mockUser2 = getMockUser();
        User mockUser3 = getMockUser();
        User mockUser4 = getMockUser();

        mockUser1.setStatus(User.Status.DELETED);
        mockUser2.setStatus(User.Status.ACTIVE);
        mockUser3.setStatus(User.Status.BLOCKED);
        mockUser4.setOnline(false);

        return List.of(mockUser1, mockUser2, mockUser3, mockUser4);
    }


}
