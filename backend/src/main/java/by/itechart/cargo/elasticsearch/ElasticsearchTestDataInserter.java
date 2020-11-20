package by.itechart.cargo.elasticsearch;

import by.itechart.cargo.elasticsearch.model.ElasticsearchInvoice;
import by.itechart.cargo.elasticsearch.model.ElasticsearchProductOwner;
import by.itechart.cargo.elasticsearch.model.ElasticsearchWaybill;
import by.itechart.cargo.elasticsearch.repository.ElasticsearchInvoiceRepository;
import by.itechart.cargo.elasticsearch.repository.ElasticsearchProductOwnerRepository;
import by.itechart.cargo.elasticsearch.repository.ElasticsearchWaybillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ElasticsearchTestDataInserter {

    private final ElasticsearchProductOwnerRepository elasticsearchProductOwnerRepository;
    private final ElasticsearchInvoiceRepository elasticsearchInvoiceRepository;
    private final ElasticsearchWaybillRepository elasticsearchWaybillRepository;
    private boolean isDataInserted;

    @Autowired
    public ElasticsearchTestDataInserter(ElasticsearchProductOwnerRepository elasticsearchProductOwnerRepository,
                                         ElasticsearchInvoiceRepository elasticsearchInvoiceRepository,
                                         ElasticsearchWaybillRepository elasticsearchWaybillRepository) {
        this.elasticsearchProductOwnerRepository = elasticsearchProductOwnerRepository;
        this.elasticsearchInvoiceRepository = elasticsearchInvoiceRepository;
        this.elasticsearchWaybillRepository = elasticsearchWaybillRepository;
    }

    public void insertTestData() {
        if (!isDataInserted) {
            insertProductOwners();
            insertInvoices();
            insertWaybills();
            isDataInserted = true;
        }
    }


    private void insertProductOwners() {
        ElasticsearchProductOwner first = new ElasticsearchProductOwner(1L, "Евроопт", 2L, "ACTIVE");
        ElasticsearchProductOwner second = new ElasticsearchProductOwner(2L, "МАГАЗИН-ИП-МАРУСЯ", 2L, "ACTIVE");
        ElasticsearchProductOwner third = new ElasticsearchProductOwner(4L, "Электросила", 2L, "ACTIVE");
        ElasticsearchProductOwner fourth = new ElasticsearchProductOwner(5L, "OOO DoubleFox", 2L, "ACTIVE");
        ElasticsearchProductOwner fifth = new ElasticsearchProductOwner(6L, "Science Industry", 2L, "ACTIVE");

        elasticsearchProductOwnerRepository.save(first);
        elasticsearchProductOwnerRepository.save(second);
        elasticsearchProductOwnerRepository.save(third);
        elasticsearchProductOwnerRepository.save(fourth);
        elasticsearchProductOwnerRepository.save(fifth);
    }


    private void insertInvoices() {
        ElasticsearchInvoice first = new ElasticsearchInvoice(1L, "TTN3499013", 2L, 2L, 3L, 5L );
        ElasticsearchInvoice second = new ElasticsearchInvoice(2L, "TTN4314411", 2L, 2L, 3L, 12L );
        ElasticsearchInvoice third = new ElasticsearchInvoice(3L, "TTN5599515", 2L, 2L, 3L, 13L );
        ElasticsearchInvoice fourth = new ElasticsearchInvoice(4L, "TTN1399063", 2L, 2L, 3L, 14L );
        ElasticsearchInvoice fifth = new ElasticsearchInvoice(5L, "TTN3347864", 2L, 2L, 3L, 17L );

        elasticsearchInvoiceRepository.save(first);
        elasticsearchInvoiceRepository.save(second);
        elasticsearchInvoiceRepository.save(third);
        elasticsearchInvoiceRepository.save(fourth);
        elasticsearchInvoiceRepository.save(fifth);

    }

    private void insertWaybills() {
        ElasticsearchWaybill first = new ElasticsearchWaybill(1L, "TTN3499013" , 3L , 5L, 2L);
        ElasticsearchWaybill second = new ElasticsearchWaybill(2L, "TTN4314411" , 3L , 12L, 2L);
        ElasticsearchWaybill third = new ElasticsearchWaybill(3L, "TTN5599515" , 3L , 13L, 2L);
        ElasticsearchWaybill fourth = new ElasticsearchWaybill(4L, "TTN1399063" , 3L , 14L, 2L);
        ElasticsearchWaybill fifth = new ElasticsearchWaybill(5L, "TTN3347864" , 3L , 17L, 2L);


        elasticsearchWaybillRepository.save(first);
        elasticsearchWaybillRepository.save(second);
        elasticsearchWaybillRepository.save(third);
        elasticsearchWaybillRepository.save(fourth);
        elasticsearchWaybillRepository.save(fifth);

    }


}
