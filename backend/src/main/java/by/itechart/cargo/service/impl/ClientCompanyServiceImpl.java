package by.itechart.cargo.service.impl;

import by.itechart.cargo.dto.model_dto.client_company.ClientCompanyRequest;
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
    public void saveOne(ClientCompanyRequest clientCompanyRequest) throws AlreadyExistException {
        final ClientCompany clientCompany = clientCompanyRequest.toClientCompany();
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
    public void update(ClientCompanyRequest clientCompanyRequest) throws NotFoundException, AlreadyExistException {
        ClientCompany clientCompany = clientCompanyRepository.findById(clientCompanyRequest.getId())
                .orElseThrow(() -> new NotFoundException(CLIENT_NOT_FOUND_MESSAGE));

        Optional<ClientCompany> byName = clientCompanyRepository.getByName(clientCompanyRequest.getName());
        if (byName.isPresent() && !byName.get().getId().equals(clientCompany.getId())) {
            throw new AlreadyExistException(String.format("Client company with name \"%s\" exists", clientCompanyRequest.getName()));
        }

        Optional<ClientCompany> byPayerAccountNumber = clientCompanyRepository.getByPayerAccountNumber(clientCompanyRequest.getPayerAccountNumber());
        if (byPayerAccountNumber.isPresent() && !byPayerAccountNumber.get().getId().equals(clientCompany.getId())) {
            throw new AlreadyExistException(String.format("Client company with payer account number \"%s\" exists", clientCompanyRequest.getPayerAccountNumber()));
        }
        Optional<ClientCompany> byEmail = clientCompanyRepository.getByEmail(clientCompanyRequest.getEmail());
        if (byEmail.isPresent() && !byEmail.get().getId().equals(clientCompany.getId())) {
            throw new AlreadyExistException(String.format("Client company with email \"%s\" exists", clientCompanyRequest.getEmail()));
        }

        clientCompany.setName(clientCompanyRequest.getName());
        clientCompany.setPayerAccountNumber(clientCompanyRequest.getPayerAccountNumber());
        clientCompany.setType(clientCompanyRequest.getType());
        clientCompany.setEmail(clientCompanyRequest.getEmail());
        clientCompany.setRegistrationDate(clientCompanyRequest.getRegistrationDate());

        Address address = clientCompany.getAddress();

        address.setCountry(clientCompanyRequest.getCountry());
        address.setCity(clientCompanyRequest.getCity());
        address.setStreet(clientCompanyRequest.getStreet());
        address.setHouse(clientCompanyRequest.getHouse());
        address.setFlat(clientCompanyRequest.getFlat());

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
