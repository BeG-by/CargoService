package by.itechart.cargo.elasticsearch;

import by.itechart.cargo.elasticsearch.model.ElasticsearchProductOwner;
import by.itechart.cargo.elasticsearch.repository.ElasticsearchProductOwnerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ElasticsearchTestDataInserter {
    private final ElasticsearchProductOwnerRepository elasticsearchProductOwnerRepository;
    private boolean isDataInserted;

    @Autowired
    public ElasticsearchTestDataInserter(ElasticsearchProductOwnerRepository productOwnerRepository) {
        this.elasticsearchProductOwnerRepository = productOwnerRepository;
        this.isDataInserted = false;
    }

    public void insertTestData() {
        if (!isDataInserted) {
            insertProductOwners();
            isDataInserted = true;
        }
    }


    private void insertProductOwners() {
        ElasticsearchProductOwner first = new ElasticsearchProductOwner(1L, "Евроопт", 2L, "ACTIVE");
        ElasticsearchProductOwner second = new ElasticsearchProductOwner(2L, "МАГАЗИН-ИП-РОГОВ", 2L, "ACTIVE");
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
