package by.itechart.cargo.elasticsearch.repository;

import by.itechart.cargo.elasticsearch.model.ElasticsearchWaybill;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

public interface ElasticsearchWaybillRepository extends ElasticsearchRepository<ElasticsearchWaybill, Long> {
    List<ElasticsearchWaybill> findAllByInvoiceNumberAndClientCompanyIdAndCheckingUserId(String invoiceNumber, Long companyId, Long checkingUserId, Pageable pageable);

    List<ElasticsearchWaybill> findAllByInvoiceNumberAndClientCompanyIdAndDriverId(String invoiceNumber, Long companyId, Long driverId, Pageable pageable);

    long countAllByInvoiceNumberAndClientCompanyIdAndCheckingUserId(String invoiceNumber, Long companyId, Long driverId);

    long countAllByInvoiceNumberAndClientCompanyIdAndDriverId(String invoiceNumber, Long companyId, Long driverId);
}
