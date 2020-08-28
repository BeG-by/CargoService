package by.itechart.cargo.service.impl;

import by.itechart.cargo.dto.model_dto.ClientCompanyDto;
import by.itechart.cargo.dto.model_dto.mapper.ClientCompanyMapper;
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
    private final ClientCompanyMapper dtoMapper;

    public ClientCompanyServiceImpl(ClientCompanyRepository clientCompanyRepository) {
        this.clientCompanyRepository = clientCompanyRepository;
        this.dtoMapper = new ClientCompanyMapper();
    }

    @Override
    public ClientCompanyDto findByName(String name) throws NotFoundException {
        ClientCompany clientCompany = clientCompanyRepository.findByName(name).orElseThrow(NotFoundException::new);
        return dtoMapper.mapToDto(clientCompany);
    }

    @Override
    public ClientCompanyDto findByName(String name, int mappingFlags) throws NotFoundException {
        ClientCompany clientCompany = clientCompanyRepository.findByName(name).orElseThrow(NotFoundException::new);
        return dtoMapper.mapToDto(clientCompany, mappingFlags);
    }

    @Override
    public ClientCompanyDto findById(Long id) throws NotFoundException {
        ClientCompany clientCompany = clientCompanyRepository.findById(id).orElseThrow(NotFoundException::new);
        return dtoMapper.mapToDto(clientCompany);
    }

    @Override
    public ClientCompanyDto findById(Long id, int mappingFlags) throws NotFoundException {
        ClientCompany clientCompany = clientCompanyRepository.findById(id).orElseThrow(NotFoundException::new);
        return dtoMapper.mapToDto(clientCompany, mappingFlags);
    }
}
