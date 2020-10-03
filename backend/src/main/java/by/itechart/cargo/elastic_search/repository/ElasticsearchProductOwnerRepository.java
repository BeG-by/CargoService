package by.itechart.cargo.elastic_search.repository;

import by.itechart.cargo.elastic_search.model.ElasticsearchProductOwner;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

public interface ElasticsearchProductOwnerRepository extends ElasticsearchRepository<ElasticsearchProductOwner, Long> {
    List<ElasticsearchProductOwner> findByNameStartsWith(String startNameStr);
}
