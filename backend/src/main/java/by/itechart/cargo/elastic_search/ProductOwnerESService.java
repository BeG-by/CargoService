package by.itechart.cargo.elastic_search;


import java.util.List;

public interface ProductOwnerESService {
    List<ProductOwnerES> findByName(String name);

    void save(ProductOwnerES productOwnerES);
}
