package by.itechart.cargo.elasticsearch;

import by.itechart.cargo.elasticsearch.model.ElasticsearchInvoice;
import by.itechart.cargo.elasticsearch.model.ElasticsearchProductOwner;
import by.itechart.cargo.elasticsearch.repository.ElasticsearchInvoiceRepository;
import by.itechart.cargo.elasticsearch.repository.ElasticsearchProductOwnerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ElasticsearchTestDataInserter {
    private final ElasticsearchInvoiceRepository elasticsearchInvoiceRepository;
    private final ElasticsearchProductOwnerRepository elasticsearchProductOwnerRepository;
    private boolean isDataInserted;

    @Autowired
    public ElasticsearchTestDataInserter(ElasticsearchInvoiceRepository invoiceRepository, ElasticsearchProductOwnerRepository productOwnerRepository) {
        this.elasticsearchInvoiceRepository = invoiceRepository;
        this.elasticsearchProductOwnerRepository = productOwnerRepository;
        this.isDataInserted = false;
    }

    public void insertTestData() {
        if (!isDataInserted) {
            insertProductOwners();
            insertInvoices();
            isDataInserted = true;
        }
    }

    private void insertInvoices() {
        ElasticsearchInvoice first = new ElasticsearchInvoice(1L, "TTN321332", 2L, 2L, 3L, 5L);
        ElasticsearchInvoice second = new ElasticsearchInvoice(3L, "TTN123123222", 2L, 2L, 3L, 5L);

        elasticsearchInvoiceRepository.save(first);
        elasticsearchInvoiceRepository.save(second);
    }

    private void insertProductOwners() {
        ElasticsearchProductOwner first = new ElasticsearchProductOwner(1L, "Евроопт", 2L, "ACTIVE");
        ElasticsearchProductOwner second = new ElasticsearchProductOwner(2L, "МАГАЗИН-ИП-РОГОВ", 2L,"ACTIVE");
        ElasticsearchProductOwner third = new ElasticsearchProductOwner(4L, "Ninja", 2L, "ACTIVE");
        ElasticsearchProductOwner fourth = new ElasticsearchProductOwner(5L, "NANI", 2L, "ACTIVE");
        ElasticsearchProductOwner fifth = new ElasticsearchProductOwner(6L, "Ninoral", 2L, "ACTIVE");

        elasticsearchProductOwnerRepository.save(first);
        elasticsearchProductOwnerRepository.save(second);
        elasticsearchProductOwnerRepository.save(third);
        elasticsearchProductOwnerRepository.save(fourth);
        elasticsearchProductOwnerRepository.save(fifth);
    }
}
