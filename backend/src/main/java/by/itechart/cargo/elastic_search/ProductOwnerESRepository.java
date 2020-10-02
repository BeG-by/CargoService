package by.itechart.cargo.elastic_search;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

public interface ProductOwnerESRepository extends ElasticsearchRepository<ProductOwnerES, Long> {
    List<ProductOwnerES> findByNameStartsWith(String startNameStr);

    List<ProductOwnerES> findByNameContaining(String nameContainStr);
}
