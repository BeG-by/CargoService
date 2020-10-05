package by.itechart.cargo.elasticsearch.repository;

import by.itechart.cargo.elasticsearch.model.ElasticsearchInvoice;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

public interface ElasticsearchInvoiceRepository extends ElasticsearchRepository<ElasticsearchInvoice, Long> {
    List<ElasticsearchInvoice> findByNumberAndClientCompanyId(String number, Long clientCompanyId);
}
