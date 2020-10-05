package by.itechart.cargo.elasticsearch.repository;

import by.itechart.cargo.elasticsearch.model.ElasticsearchInvoice;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

public interface ElasticsearchInvoiceRepository extends ElasticsearchRepository<ElasticsearchInvoice, Long> {

    List<ElasticsearchInvoice> findAllByNumberStartsWithAndClientCompanyIdAndRegistrationUserId(String number, Long clientCompanyId, Long registrationUserId, Pageable pageable);

    List<ElasticsearchInvoice> findALlByNumberStartsWithAndClientCompanyIdAndCheckingUserId(String number, Long clientCompanyId, Long registrationUserId, Pageable pageable);

    Long countAllByNumberStartsWithAndClientCompanyIdAndCheckingUserId(String number, Long clientCompanyId, Long checkingUserId);

    Long countAllByNumberStartsWithAndClientCompanyIdAndRegistrationUserId(String number, Long clientCompanyId, Long registrationUserId);
}
