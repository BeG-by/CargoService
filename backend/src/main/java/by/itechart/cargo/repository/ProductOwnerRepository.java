package by.itechart.cargo.repository;

import by.itechart.cargo.model.ClientCompany;
import by.itechart.cargo.model.freight.ProductOwner;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductOwnerRepository extends JpaRepository<ProductOwner, Long> {

    List<ProductOwner> findByClientCompany(ClientCompany clientCompany);

}