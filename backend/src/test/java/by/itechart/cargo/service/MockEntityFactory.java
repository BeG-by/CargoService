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
    private final static Integer SYSADMIN_ROLE_ID = 1;
    private final static Integer DISPATCHER_ROLE_ID = 2;
    private final static Integer MANAGER_ROLE_ID = 3;
    private final static Integer ADMIN_ROLE_ID = 4;
    private final static Integer DRIVER_ROLE_ID = 5;
    private final static Integer OWNER_ROLE_ID = 6;


    public static User getMockUser(Role.RoleType roleType) {
        User user = getMockJwtUser(roleType).toUser();
        user.setOnline(true);
        return user;
    }

    public static JwtUserDetails getMockJwtUser(Role.RoleType roleType) {
        Set<Role> roleSet = new HashSet<>();
        switch (roleType) {
            case SYSADMIN:
                roleSet.add(Role.builder().roleId(SYSADMIN_ROLE_ID).role(Role.RoleType.SYSADMIN).build());
                break;
            case ADMIN:
                roleSet.add(Role.builder().roleId(ADMIN_ROLE_ID).role(Role.RoleType.ADMIN).build());
                break;
            case MANAGER:
                roleSet.add(Role.builder().roleId(MANAGER_ROLE_ID).role(Role.RoleType.MANAGER).build());
                break;
            case DISPATCHER:
                roleSet.add(Role.builder().roleId(DISPATCHER_ROLE_ID).role(Role.RoleType.DISPATCHER).build());
                break;
            case DRIVER:
                roleSet.add(Role.builder().roleId(DRIVER_ROLE_ID).role(Role.RoleType.DRIVER).build());
                break;
            case OWNER:
                roleSet.add(Role.builder().roleId(OWNER_ROLE_ID).role(Role.RoleType.OWNER).build());
                break;
        }

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
                .clientCompany(getMockCompany())
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

        User mockUser1 = getMockUser(Role.RoleType.ADMIN);
        User mockUser2 = getMockUser(Role.RoleType.ADMIN);
        User mockUser3 = getMockUser(Role.RoleType.ADMIN);
        User mockUser4 = getMockUser(Role.RoleType.ADMIN);

        mockUser1.setStatus(User.Status.DELETED);
        mockUser2.setStatus(User.Status.ACTIVE);
        mockUser3.setStatus(User.Status.BLOCKED);
        mockUser4.setOnline(false);

        return List.of(mockUser1, mockUser2, mockUser3, mockUser4);
    }


}
