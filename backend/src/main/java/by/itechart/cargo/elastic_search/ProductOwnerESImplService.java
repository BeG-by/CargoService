package by.itechart.cargo.elastic_search;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@Slf4j
public class ProductOwnerESImplService implements ProductOwnerESService {

    private ProductOwnerESRepository repository;

    @Autowired
    public ProductOwnerESImplService(ProductOwnerESRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<ProductOwnerES> findByName(String name) {
        return repository.findByNameStartsWith(name);
    }

    @Override
    public void save(ProductOwnerES productOwnerES) {
        repository.save(productOwnerES);
    }
}
