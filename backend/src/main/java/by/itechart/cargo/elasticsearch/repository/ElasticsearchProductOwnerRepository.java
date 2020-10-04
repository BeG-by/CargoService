package by.itechart.cargo.elasticsearch.repository;

import by.itechart.cargo.elasticsearch.model.ElasticsearchProductOwner;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

public interface ElasticsearchProductOwnerRepository extends ElasticsearchRepository<ElasticsearchProductOwner, Long> {
    List<ElasticsearchProductOwner> findByNameStartsWithAndClientCompanyId(String startNameStr,
                                                                           Long clientCompanyId);

    List<ElasticsearchProductOwner> findAllByNameStartsWithAndClientCompanyId(String startNameStr,
                                                                              Long clientCompanyId,
                                                                              Pageable pageable);
}
