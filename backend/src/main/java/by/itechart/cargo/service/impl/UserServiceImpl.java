package by.itechart.cargo.service.impl;

import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.model.User;
import by.itechart.cargo.repository.UserRepository;
import by.itechart.cargo.service.UserService;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User findByLogin(String login) throws NotFoundException {
        return userRepository.findByLogin(login).orElseThrow(NotFoundException::new);
    }

    @Override
    public List<User> findByClientCompanyId(Long clientCompanyId) throws NotFoundException {
        return userRepository.findByClientCompanyId(clientCompanyId).orElseThrow(NotFoundException::new);
    }

}
