package by.itechart.cargo.elasticsearch.repository;

import by.itechart.cargo.elasticsearch.model.ElasticsearchProductOwner;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

public interface ElasticsearchProductOwnerRepository extends ElasticsearchRepository<ElasticsearchProductOwner, Long> {

    Long countAllByNameStartsWithAndClientCompanyIdAndStatus(String startNameStr,
                                                             Long clientCompanyId,
                                                             String status);

    List<ElasticsearchProductOwner> findAllByNameStartsWithAndClientCompanyIdAndStatus(String startNameStr,
                                                                                       Long clientCompanyId,
                                                                                       String status,
                                                                                       Pageable pageable);
}
