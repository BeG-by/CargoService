package by.itechart.cargo.service.impl;

import by.itechart.cargo.dto.model_dto.client_company.ClientCompanyDTO;
import by.itechart.cargo.exception.AlreadyExistException;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.model.Address;
import by.itechart.cargo.model.ClientCompany;
import by.itechart.cargo.repository.ClientCompanyRepository;
import by.itechart.cargo.service.ClientCompanyService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

import static by.itechart.cargo.service.constant.MessageConstant.CLIENT_NOT_FOUND_MESSAGE;

@Transactional
@Service
@Slf4j
public class ClientCompanyServiceImpl implements ClientCompanyService {

    private final ClientCompanyRepository clientCompanyRepository;


    @Autowired
    public ClientCompanyServiceImpl(ClientCompanyRepository clientCompanyRepository) {
        this.clientCompanyRepository = clientCompanyRepository;

    }

    @Override
    public ClientCompany findById(Long id) throws NotFoundException {
        return clientCompanyRepository.findById(id).orElseThrow(() -> new NotFoundException(CLIENT_NOT_FOUND_MESSAGE));
    }

    @Override
    public List<ClientCompany> findAll() {
        return clientCompanyRepository.findAll();
    }

    @Override
    public void save(ClientCompanyDTO clientCompanyDTO) throws AlreadyExistException {
        final ClientCompany clientCompany = clientCompanyDTO.toClientCompany();
        final String name = clientCompany.getName();
        final String payerAccountNumber = clientCompany.getPayerAccountNumber();
        final String email = clientCompany.getEmail();

        if (clientCompanyRepository.getByName(name).isPresent()) {
            throw new AlreadyExistException(String.format("Client company with name \"%s\" exists", name));
        }

        if (clientCompanyRepository.getByPayerAccountNumber(payerAccountNumber).isPresent()) {
            throw new AlreadyExistException(String.format("Client company with payer account number \"%s\" exists", payerAccountNumber));
        }
        if (clientCompanyRepository.getByEmail(email).isPresent()) {
            throw new AlreadyExistException(String.format("Client company with email \"%s\" exists", email));
        }

        final ClientCompany clientDb = clientCompanyRepository.save(clientCompany);
        log.info("Client company has been saved {}", clientDb);
    }

    @Override
    public void update(ClientCompanyDTO clientCompanyDTO) throws NotFoundException, AlreadyExistException {
        ClientCompany clientCompany = clientCompanyRepository.findById(clientCompanyDTO.getId())
                .orElseThrow(() -> new NotFoundException(CLIENT_NOT_FOUND_MESSAGE));

        Optional<ClientCompany> byName = clientCompanyRepository.getByName(clientCompanyDTO.getName());
        if (byName.isPresent() && !byName.get().getId().equals(clientCompany.getId())) {
            throw new AlreadyExistException(String.format("Client company with name \"%s\" exists", clientCompanyDTO.getName()));
        }

        Optional<ClientCompany> byPayerAccountNumber = clientCompanyRepository.getByPayerAccountNumber(clientCompanyDTO.getPayerAccountNumber());
        if (byPayerAccountNumber.isPresent() && !byPayerAccountNumber.get().getId().equals(clientCompany.getId())) {
            throw new AlreadyExistException(String.format("Client company with payer account number \"%s\" exists", clientCompanyDTO.getPayerAccountNumber()));
        }
        Optional<ClientCompany> byEmail = clientCompanyRepository.getByEmail(clientCompanyDTO.getEmail());
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
        ClientCompany clientCompany = clientCompanyRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(CLIENT_NOT_FOUND_MESSAGE));
        clientCompanyRepository.delete(clientCompany);
        log.info("Client company has been deleted {}", clientCompany);
    }

}
