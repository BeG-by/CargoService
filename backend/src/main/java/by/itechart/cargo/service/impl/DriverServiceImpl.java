package by.itechart.cargo.service.impl;

import by.itechart.cargo.dto.model_dto.user.UserResponse;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.model.Role;
import by.itechart.cargo.repository.RoleRepository;
import by.itechart.cargo.repository.UserRepository;
import by.itechart.cargo.security.jwt.JwtTokenUtil;
import by.itechart.cargo.service.DriverService;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

import static by.itechart.cargo.service.constant.MessageConstant.DRIVER_NOT_FOUND_MESSAGE;

@Service
@Transactional
public class DriverServiceImpl implements DriverService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final JwtTokenUtil jwtTokenUtil;

    private final static Role.RoleType DRIVER_ROLE = Role.RoleType.valueOf("DRIVER");

    public DriverServiceImpl(UserRepository userRepository, RoleRepository roleRepository, JwtTokenUtil jwtTokenUtil) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @Override
    public List<UserResponse> findAll() {
        final Long clientCompanyId = jwtTokenUtil.getJwtUser().getClientCompany().getId();

        final Role driverRole = roleRepository.getByRole(DRIVER_ROLE);

        return userRepository.findAllByClientCompanyIdAndRoles(clientCompanyId, driverRole)
                .stream()
                .map(UserResponse::toUserResponse)
                .collect(Collectors.toList());
    }

    @Override
    public UserResponse findById(long id) throws NotFoundException {

        final Long clientCompanyId = jwtTokenUtil.getJwtUser().getClientCompany().getId();
        final Role driverRole = roleRepository.getByRole(DRIVER_ROLE);

        return userRepository.findByIdAndRolesAndClientCompanyId(id, driverRole, clientCompanyId)
                .map(UserResponse::toUserResponse)
                .orElseThrow(() -> new NotFoundException(DRIVER_NOT_FOUND_MESSAGE));
    }

}
