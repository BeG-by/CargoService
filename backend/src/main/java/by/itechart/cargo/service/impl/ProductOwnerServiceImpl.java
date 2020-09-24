package by.itechart.cargo.service.impl;

import by.itechart.cargo.dto.model_dto.product_owner.ProductOwnerSaveRequest;
import by.itechart.cargo.dto.model_dto.product_owner.ProductOwnerUpdateRequest;
import by.itechart.cargo.exception.AlreadyExistException;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.model.enumeration.CompanyType;
import by.itechart.cargo.model.freight.ProductOwner;
import by.itechart.cargo.repository.ClientCompanyRepository;
import by.itechart.cargo.repository.ProductOwnerRepository;
import by.itechart.cargo.security.jwt.JwtTokenUtil;
import by.itechart.cargo.service.ProductOwnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

import static by.itechart.cargo.service.constant.MessageConstant.PRODUCT_OWNER_NOT_FOUND_MESSAGE;

@Service
@Transactional
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
        return productOwnerRepository.findByClientCompany(jwtTokenUtil.getJwtUser().getClientCompany());
    }

    @Override
    public ProductOwner findById(Long id) throws NotFoundException {

//        if (!productOwner.getClientCompany().getId().equals(jwtTokenUtil.getJwtUser().getClientCompany().getId())) {
//            throw new "Not your product onwer"
//        }

        return productOwnerRepository
                .findById(id)
                .orElseThrow(() -> new NotFoundException(PRODUCT_OWNER_NOT_FOUND_MESSAGE));
    }

    @Override
    public void save(ProductOwnerSaveRequest productOwnerSaveRequest) throws AlreadyExistException, NotFoundException {
        ProductOwner productOwner = productOwnerSaveRequest.toProductOwner();
        Long clientCompanyId = jwtTokenUtil.getJwtUser().getClientCompany().getId();

        if (productOwnerRepository.findByName(productOwner.getName()).isPresent()) {
            throw new AlreadyExistException("Product owner with such name already exist");
        }
        productOwner.setClientCompany(clientCompanyRepository.getOne(clientCompanyId));
        productOwnerRepository.save(productOwner);
    }

    @Override
    public void update(ProductOwnerUpdateRequest productOwnerUpdateRequest) throws NotFoundException, AlreadyExistException {
        ProductOwner productOwner = productOwnerRepository.findById(productOwnerUpdateRequest.getId())
                .orElseThrow(() -> new NotFoundException("Product owner not found"));

        Optional<ProductOwner> productOwnerByName = productOwnerRepository.findByName(productOwnerUpdateRequest.getName());
        if (productOwnerByName.isPresent() && !productOwnerByName.get().getId().equals(productOwner.getId())) {
            throw new AlreadyExistException("Product owner with such name already exist");
        }

        productOwner.setName(productOwnerUpdateRequest.getName());
        productOwner.setPhone(productOwnerUpdateRequest.getPhone());
        productOwner.setRegistrationDate(productOwnerUpdateRequest.getRegistrationDate());
        productOwner.setType(CompanyType.valueOf(productOwnerUpdateRequest.getType()));
        productOwner.setAddress(productOwnerUpdateRequest.getAddress());
    }

    @Override
    public void delete(Long id) throws NotFoundException {
        ProductOwner productOwner = productOwnerRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Product owner not found"));
        productOwnerRepository.delete(productOwner);
    }


}
