package by.itechart.cargo.elasticsearch.repository;

import by.itechart.cargo.elasticsearch.model.ElasticsearchProductOwner;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface ElasticsearchProductOwnerRepository extends ElasticsearchRepository<ElasticsearchProductOwner, Long> {

    Page<ElasticsearchProductOwner> findAllByNameStartsWithAndClientCompanyIdAndStatus(String startNameStr,
                                                                                       Long clientCompanyId,
                                                                                       String status, Pageable pageable);
}
