package by.itechart.cargo.service.impl;

import by.itechart.cargo.dto.model_dto.product_owner.ProductOwnerSaveRequest;
import by.itechart.cargo.dto.model_dto.product_owner.ProductOwnerTableResponse;
import by.itechart.cargo.dto.model_dto.product_owner.ProductOwnerUpdateRequest;
import by.itechart.cargo.elasticsearch.model.ElasticsearchProductOwner;
import by.itechart.cargo.elasticsearch.repository.ElasticsearchProductOwnerRepository;
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
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static by.itechart.cargo.service.constant.MessageConstant.PRODUCT_OWNER_EXIST_MESSAGE;
import static by.itechart.cargo.service.constant.MessageConstant.PRODUCT_OWNER_NOT_FOUND_MESSAGE;

@Service
@Transactional
@Slf4j
public class ProductOwnerServiceImpl implements ProductOwnerService {

    private final ProductOwnerRepository productOwnerRepository;
    private final ElasticsearchProductOwnerRepository elasticSearchProductOwnerRepository;
    private final ClientCompanyRepository clientCompanyRepository;
    private final JwtTokenUtil jwtTokenUtil;
    private boolean isDataInserted;

    @Autowired
    public ProductOwnerServiceImpl(ProductOwnerRepository productOwnerRepository,
                                   ClientCompanyRepository clientCompanyRepository,
                                   JwtTokenUtil jwtTokenUtil,
                                   ElasticsearchProductOwnerRepository elasticSearchProductOwnerRepository) {
        this.productOwnerRepository = productOwnerRepository;
        this.jwtTokenUtil = jwtTokenUtil;
        this.clientCompanyRepository = clientCompanyRepository;
        this.elasticSearchProductOwnerRepository = elasticSearchProductOwnerRepository;
        this.isDataInserted = false;
    }

    private void insertDataForTest() {
        ElasticsearchProductOwner first = new ElasticsearchProductOwner(1L, "Евроопт", 2L);
        ElasticsearchProductOwner second = new ElasticsearchProductOwner(2L, "МАГАЗИН-ИП-РОГОВ", 2L);
        ElasticsearchProductOwner third = new ElasticsearchProductOwner(4L, "Ninja", 2L);
        ElasticsearchProductOwner fourth = new ElasticsearchProductOwner(5L, "NANI", 2L);
        ElasticsearchProductOwner fifth = new ElasticsearchProductOwner(6L, "Ninoral", 2L);

        elasticSearchProductOwnerRepository.save(first);
        elasticSearchProductOwnerRepository.save(second);
        elasticSearchProductOwnerRepository.save(third);
        elasticSearchProductOwnerRepository.save(fourth);
        elasticSearchProductOwnerRepository.save(fifth);
    }

    @Override
    public ProductOwnerTableResponse findAll(int requestedPage, int productOwnersPerPage) {
        if (!isDataInserted) {
            insertDataForTest();
            isDataInserted = true;
        }
        PageRequest pageRequest = PageRequest.of(requestedPage, productOwnersPerPage);
        int totalAmount = productOwnerRepository.countAllByClientCompanyAndStatus
                (jwtTokenUtil.getJwtUser().getClientCompany(), ProductOwner.Status.ACTIVE);

        List<ProductOwner> productOwners = productOwnerRepository.findAllByClientCompanyAndStatus(
                jwtTokenUtil.getJwtUser().getClientCompany(), ProductOwner.Status.ACTIVE, pageRequest);

        return new ProductOwnerTableResponse(totalAmount, productOwners);
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
        elasticSearchProductOwnerRepository.save(ElasticsearchProductOwner.fromProductOwner(productOwner));

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

        elasticSearchProductOwnerRepository.save(ElasticsearchProductOwner.fromProductOwner(productOwner));
        log.info("Product owner has been updated {}", productOwner);
    }

    @Override
    public void delete(Long id) throws NotFoundException {
        ProductOwner productOwner = productOwnerRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(PRODUCT_OWNER_NOT_FOUND_MESSAGE));
        productOwner.setStatus(ProductOwner.Status.DELETED);

        elasticSearchProductOwnerRepository.delete(ElasticsearchProductOwner.fromProductOwner(productOwner));
        log.info("Product owner has been deleted {}", productOwner);
    }


    @Override
    public ProductOwnerTableResponse findByName(String name, int requestedPage, int productOwnersPerPage) {
        PageRequest pageRequest = PageRequest.of(requestedPage, productOwnersPerPage);

        Long clientCompanyId = jwtTokenUtil.getJwtUser().getClientCompany().getId();
        List<Long> ids = elasticSearchProductOwnerRepository
                .findAllByNameStartsWithAndClientCompanyId(name, clientCompanyId, pageRequest).stream()
                .map(ElasticsearchProductOwner::getId)
                .collect(Collectors.toList());
        List<ProductOwner> productOwners = productOwnerRepository.findByIdIsIn(ids);

        return new ProductOwnerTableResponse(ids.size(), productOwners);
    }
}
