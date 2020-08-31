package by.itechart.cargo.service.impl;

import by.itechart.cargo.model.freight.ProductOwner;
import by.itechart.cargo.repository.ProductOwnerRepository;
import by.itechart.cargo.security.jwt.JwtTokenUtil;
import by.itechart.cargo.service.ProductOwnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class ProductOwnerServiceImpl implements ProductOwnerService {

    private final ProductOwnerRepository productOwnerRepository;
    private final JwtTokenUtil jwtTokenUtil;

    @Autowired
    public ProductOwnerServiceImpl(ProductOwnerRepository productOwnerRepository, JwtTokenUtil jwtTokenUtil) {
        this.productOwnerRepository = productOwnerRepository;
        this.jwtTokenUtil = jwtTokenUtil;
    }


    @Override
    public List<ProductOwner> findAll() {
        return productOwnerRepository.findByClientCompany(jwtTokenUtil.getJwtUser().getClientCompany());
    }

}
