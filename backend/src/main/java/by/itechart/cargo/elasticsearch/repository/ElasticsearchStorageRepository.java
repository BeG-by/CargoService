package by.itechart.cargo.elasticsearch.repository;

import by.itechart.cargo.elasticsearch.model.ElasticsearchStorage;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.awt.print.Pageable;
import java.util.List;

public interface ElasticsearchStorageRepository extends ElasticsearchRepository<ElasticsearchStorage, Long> {
}
