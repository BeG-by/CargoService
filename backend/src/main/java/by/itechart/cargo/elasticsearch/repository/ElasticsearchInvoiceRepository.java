package by.itechart.cargo.elasticsearch.repository;

import by.itechart.cargo.elasticsearch.model.ElasticsearchInvoice;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

//todo: refactor with Page<>
public interface ElasticsearchInvoiceRepository extends ElasticsearchRepository<ElasticsearchInvoice, Long> {

    List<ElasticsearchInvoice> findAllByNumberStartsWithAndClientCompanyIdAndRegistrationUserId(String number, Long clientCompanyId, Long registrationUserId, Pageable pageable);

    List<ElasticsearchInvoice> findALlByNumberStartsWithAndClientCompanyIdAndCheckingUserId(String number, Long clientCompanyId, Long registrationUserId, Pageable pageable);

    List<ElasticsearchInvoice> findALlByNumberStartsWithAndClientCompanyIdAndDriverId(String number, Long driverId, Long clientCompanyId, Pageable pageable);

    List<ElasticsearchInvoice> findALlByNumberStartsWithAndClientCompanyId(String number, Long clientCompanyId, Pageable pageable);

    Long countAllByNumberStartsWithAndClientCompanyId(String number, Long clientCompanyId);

    Long countAllByNumberStartsWithAndClientCompanyIdAndCheckingUserId(String number, Long clientCompanyId, Long checkingUserId);

    Long countAllByNumberStartsWithAndClientCompanyIdAndRegistrationUserId(String number, Long clientCompanyId, Long registrationUserId);

    Long countAllByNumberStartsWithAndClientCompanyIdAndDriverId(String number, Long clientCompanyId, Long driverId);
}
