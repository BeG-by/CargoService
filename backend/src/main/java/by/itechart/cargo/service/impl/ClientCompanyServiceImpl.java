package by.itechart.cargo.service.impl;

import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.model.ClientCompany;
import by.itechart.cargo.repository.ClientCompanyRepository;
import by.itechart.cargo.service.ClientCompanyService;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Transactional
@Service
public class ClientCompanyServiceImpl implements ClientCompanyService {

    private final ClientCompanyRepository clientCompanyRepository;

    public ClientCompanyServiceImpl(ClientCompanyRepository clientCompanyRepository) {
        this.clientCompanyRepository = clientCompanyRepository;
    }


    @Override
    public ClientCompany findByName(String name) throws NotFoundException {
        return clientCompanyRepository.findByName(name).orElseThrow(NotFoundException::new);
    }
}
