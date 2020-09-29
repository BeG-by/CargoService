package by.itechart.cargo.service.impl;

import by.itechart.cargo.dto.model_dto.product_owner.ProductOwnerSaveRequest;
import by.itechart.cargo.dto.model_dto.product_owner.ProductOwnerUpdateRequest;
import by.itechart.cargo.exception.AlreadyExistException;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.model.ClientCompany;
import by.itechart.cargo.model.ProductOwner;
import by.itechart.cargo.repository.ClientCompanyRepository;
import by.itechart.cargo.repository.ProductOwnerRepository;
import by.itechart.cargo.security.jwt.JwtTokenUtil;
import by.itechart.cargo.service.ProductOwnerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

import static by.itechart.cargo.service.constant.MessageConstant.PRODUCT_OWNER_EXIST_MESSAGE;
import static by.itechart.cargo.service.constant.MessageConstant.PRODUCT_OWNER_NOT_FOUND_MESSAGE;

@Service
@Transactional
@Slf4j
public class ProductOwnerServiceImpl implements ProductOwnerService {

    private final ProductOwnerRepository productOwnerRepository;
    private final ClientCompanyRepository clientCompanyRepository;
    private final JwtTokenUtil jwtTokenUtil;

    @Autowired
    public ProductOwnerServiceImpl(ProductOwnerRepository productOwnerRepository,
                                   ClientCompanyRepository clientCompanyRepository,
                                   JwtTokenUtil jwtTokenUtil) {
        this.productOwnerRepository = productOwnerRepository;
        this.jwtTokenUtil = jwtTokenUtil;
        this.clientCompanyRepository = clientCompanyRepository;
    }


    @Override
    public List<ProductOwner> findAll() {
        return productOwnerRepository.findByClientCompanyAndStatus(jwtTokenUtil.getJwtUser().getClientCompany(), ProductOwner.Status.ACTIVE);
    }

    @Override
    public ProductOwner findById(Long id) throws NotFoundException {
        ClientCompany clientCompany = jwtTokenUtil.getJwtUser().getClientCompany();
        ClientCompany clientCompanyProxy = clientCompanyRepository.getOne(clientCompany.getId());
        return productOwnerRepository
                .findByIdAndClientCompanyAndStatus(id, clientCompanyProxy, ProductOwner.Status.ACTIVE)
                .orElseThrow(() -> new NotFoundException(PRODUCT_OWNER_NOT_FOUND_MESSAGE));
    }

    @Override
    public void save(ProductOwnerSaveRequest productOwnerSaveRequest) throws AlreadyExistException {
        ProductOwner productOwner = productOwnerSaveRequest.toProductOwner();
        ClientCompany clientCompany = jwtTokenUtil.getJwtUser().getClientCompany();
        ClientCompany clientCompanyProxy = clientCompanyRepository.findById(clientCompany.getId()).get();

        if (productOwnerRepository.findByNameAndClientCompanyAndStatus(productOwner.getName(), clientCompanyProxy, ProductOwner.Status.ACTIVE).isPresent()) {
            throw new AlreadyExistException(PRODUCT_OWNER_EXIST_MESSAGE);
        }

        productOwner.setClientCompany(clientCompanyProxy);
        productOwnerRepository.save(productOwner);
        log.info("Product owner has been saved {}", productOwner);
    }

    @Override
    public void update(ProductOwnerUpdateRequest productOwnerUpdateRequest) throws NotFoundException, AlreadyExistException {
        ClientCompany clientCompany = jwtTokenUtil.getJwtUser().getClientCompany();
        ClientCompany clientCompanyProxy = clientCompanyRepository.findById(clientCompany.getId()).get();

        ProductOwner productOwner = productOwnerRepository
                .findByIdAndClientCompanyAndStatus(productOwnerUpdateRequest.getId(), clientCompanyProxy, ProductOwner.Status.ACTIVE)
                .orElseThrow(() -> new NotFoundException(PRODUCT_OWNER_NOT_FOUND_MESSAGE));

        Optional<ProductOwner> productOwnerByName = productOwnerRepository
                .findByNameAndClientCompanyAndStatus(productOwnerUpdateRequest.getName(), clientCompanyProxy, ProductOwner.Status.ACTIVE);

        if (productOwnerByName.isPresent() && !productOwnerByName.get().getId().equals(productOwner.getId())) {
            throw new AlreadyExistException(PRODUCT_OWNER_EXIST_MESSAGE);
        }

        productOwner.setName(productOwnerUpdateRequest.getName());
        productOwner.setPhone(productOwnerUpdateRequest.getPhone());
        productOwner.setRegistrationDate(productOwnerUpdateRequest.getRegistrationDate());
        productOwner.setType(ProductOwner.CompanyType.valueOf(productOwnerUpdateRequest.getType()));
        productOwner.setAddress(productOwnerUpdateRequest.getAddress());
        log.info("Product owner has been updated {}", productOwner);
    }

    @Override
    public void delete(Long id) throws NotFoundException {
        ProductOwner productOwner = productOwnerRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(PRODUCT_OWNER_NOT_FOUND_MESSAGE));
        productOwner.setStatus(ProductOwner.Status.DELETED);
        log.info("Product owner has been deleted {}", productOwner);
    }
}
