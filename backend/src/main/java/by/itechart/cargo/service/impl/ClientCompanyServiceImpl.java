package by.itechart.cargo.service.impl;

import by.itechart.cargo.dto.model_dto.client_company.ClientCompanyDTO;
import by.itechart.cargo.exception.AlreadyExistException;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.exception.ServiceException;
import by.itechart.cargo.model.*;
import by.itechart.cargo.repository.ActivationDetailsRepository;
import by.itechart.cargo.repository.ClientCompanyRepository;
import by.itechart.cargo.repository.UserRepository;
import by.itechart.cargo.service.ClientCompanyService;
import by.itechart.cargo.service.MailSenderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

import static by.itechart.cargo.service.util.MessageConstant.CLIENT_NOT_FOUND_MESSAGE;
import static by.itechart.cargo.service.util.MessageConstant.EMAIL_EXIST_MESSAGE;

@Transactional
@Service
@Slf4j
public class ClientCompanyServiceImpl implements ClientCompanyService {

    private final ClientCompanyRepository clientCompanyRepository;
    private final ActivationDetailsRepository activationDetailsRepository;
    private final UserRepository userRepository;
    private final MailSenderService mailSenderService;


    @Autowired
    public ClientCompanyServiceImpl(ClientCompanyRepository clientCompanyRepository, ActivationDetailsRepository activationDetailsRepository, UserRepository userRepository, MailSenderService mailSenderService) {
        this.clientCompanyRepository = clientCompanyRepository;
        this.activationDetailsRepository = activationDetailsRepository;
        this.userRepository = userRepository;
        this.mailSenderService = mailSenderService;
    }

    @Override
    public ClientCompany findById(Long id) throws NotFoundException {
        return clientCompanyRepository.findByIdAndNotDeleted(id).orElseThrow(() -> new NotFoundException(CLIENT_NOT_FOUND_MESSAGE));
    }

    @Override
    public List<ClientCompany> findAll() {
        return clientCompanyRepository.findAllNotDeleted();
    }

    @Override
    public void save(ClientCompanyDTO clientCompanyDTO) throws AlreadyExistException, NotFoundException, ServiceException {
        ClientCompany clientCompany = clientCompanyDTO.toClientCompany();
        clientCompany.setStatus(ClientCompany.Status.ACTIVE);
        final String name = clientCompany.getName();
        final String payerAccountNumber = clientCompany.getPayerAccountNumber();
        final String email = clientCompany.getEmail();

        if (clientCompanyRepository.findByName(name).isPresent()) {
            throw new AlreadyExistException(String.format("Client company with name \"%s\" exists", name));
        }

        if (clientCompanyRepository.findByPayerAccountNumber(payerAccountNumber).isPresent()) {
            throw new AlreadyExistException(String.format("Client company with payer account number \"%s\" exists", payerAccountNumber));
        }
        if (clientCompanyRepository.findByEmail(email).isPresent()) {
            throw new AlreadyExistException(String.format("Client company with email \"%s\" exists", email));
        }

        final ClientCompany savedClientCompany = clientCompanyRepository.save(clientCompany);

        sendActivationEmailToAdmin(clientCompany);
        log.info("Client company has been saved {}", savedClientCompany);
    }

    private void sendActivationEmailToAdmin(ClientCompany clientCompany) throws AlreadyExistException, ServiceException {
        final Optional<ActivationDetails> userToActivateDb = activationDetailsRepository.findByEmail(clientCompany.getEmail());
        if (userToActivateDb.isPresent()) {
            throw new AlreadyExistException(String.format(
                    "Message was send to email %s on %s",
                    clientCompany.getEmail(),
                    userToActivateDb.get().getCreateDate()
            ));
        }

        if (userRepository.findByEmail(clientCompany.getEmail()).isPresent()) {
            throw new AlreadyExistException(EMAIL_EXIST_MESSAGE);
        }

        final String code = mailSenderService.sendActivationMail(clientCompany.getEmail(), Role.RoleType.ADMIN.toString());

        final ActivationDetails activationDetails = ActivationDetails.builder()
                .email(clientCompany.getEmail())
                .role(Role.RoleType.ADMIN)
                .activationCode(code)
                .isActive(false)
                .clientCompany(clientCompany)
                .build();

        final ActivationDetails userSave = activationDetailsRepository.save(activationDetails);

        log.info("Activation details have been saved {}", userSave);
    }


    @Override
    public void update(ClientCompanyDTO clientCompanyDTO) throws NotFoundException, AlreadyExistException {
        ClientCompany clientCompany = clientCompanyRepository.findByIdAndNotDeleted(clientCompanyDTO.getId())
                .orElseThrow(() -> new NotFoundException(CLIENT_NOT_FOUND_MESSAGE));

        Optional<ClientCompany> byName = clientCompanyRepository.findByName(clientCompanyDTO.getName());
        if (byName.isPresent() && !byName.get().getId().equals(clientCompany.getId())) {
            throw new AlreadyExistException(String.format("Client company with name \"%s\" exists", clientCompanyDTO.getName()));
        }

        Optional<ClientCompany> byPayerAccountNumber = clientCompanyRepository.findByPayerAccountNumber(clientCompanyDTO.getPayerAccountNumber());
        if (byPayerAccountNumber.isPresent() && !byPayerAccountNumber.get().getId().equals(clientCompany.getId())) {
            throw new AlreadyExistException(String.format("Client company with payer account number \"%s\" exists", clientCompanyDTO.getPayerAccountNumber()));
        }
        Optional<ClientCompany> byEmail = clientCompanyRepository.findByEmail(clientCompanyDTO.getEmail());
        if (byEmail.isPresent() && !byEmail.get().getId().equals(clientCompany.getId())) {
            throw new AlreadyExistException(String.format("Client company with email \"%s\" exists", clientCompanyDTO.getEmail()));
        }

        clientCompany.setName(clientCompanyDTO.getName());
        clientCompany.setPayerAccountNumber(clientCompanyDTO.getPayerAccountNumber());
        clientCompany.setType(clientCompanyDTO.getType());
        clientCompany.setEmail(clientCompanyDTO.getEmail());
        clientCompany.setRegistrationDate(clientCompanyDTO.getRegistrationDate());

        Address address = clientCompany.getAddress();

        address.setCountry(clientCompanyDTO.getCountry());
        address.setCity(clientCompanyDTO.getCity());
        address.setStreet(clientCompanyDTO.getStreet());
        address.setHouse(clientCompanyDTO.getHouse());
        address.setFlat(clientCompanyDTO.getFlat());

        log.info("Client company has been updated {}", clientCompany);
    }

    @Override
    public void delete(Long id) throws NotFoundException {
        ClientCompany clientCompany = clientCompanyRepository.findByIdAndNotDeleted(id)
                .orElseThrow(() -> new NotFoundException(CLIENT_NOT_FOUND_MESSAGE));

        for (User user : clientCompany.getUsers()) {
            if (!user.getStatus().equals(User.Status.DELETED)) {
                user.setStatus(User.Status.DELETED);
                log.info("User has been deleted {}", user);
            }
        }

        clientCompany.setStatus(ClientCompany.Status.DELETED);
        log.info("Client company has been deleted {}", clientCompany);
    }

}
