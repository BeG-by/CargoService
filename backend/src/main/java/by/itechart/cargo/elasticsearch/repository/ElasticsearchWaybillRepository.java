package by.itechart.cargo.elasticsearch.repository;

import by.itechart.cargo.elasticsearch.model.ElasticsearchWaybill;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface ElasticsearchWaybillRepository extends ElasticsearchRepository<ElasticsearchWaybill, Long> {

    Page<ElasticsearchWaybill> findAllByInvoiceNumberStartsWithAndClientCompanyId(String invoiceNumber, Long companyId, Pageable pageable);

    Page<ElasticsearchWaybill> findAllByInvoiceNumberStartsWithAndClientCompanyIdAndCheckingUserId(String invoiceNumber, Long companyId, Long checkingUserId, Pageable pageable);

    Page<ElasticsearchWaybill> findAllByInvoiceNumberStartsWithAndClientCompanyIdAndDriverId(String invoiceNumber, Long companyId, Long driverId, Pageable pageable);
}
