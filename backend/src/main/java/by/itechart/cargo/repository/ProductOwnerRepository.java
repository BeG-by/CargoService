package by.itechart.cargo.repository;

import by.itechart.cargo.model.ClientCompany;
import by.itechart.cargo.model.enumeration.ProductOwnerStatus;
import by.itechart.cargo.model.freight.ProductOwner;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductOwnerRepository extends JpaRepository<ProductOwner, Long> {

    List<ProductOwner> findByClientCompanyAndStatus(ClientCompany clientCompany, ProductOwnerStatus status);

    Optional<ProductOwner> findByNameAndClientCompanyAndStatus(String name, ClientCompany clientCompany, ProductOwnerStatus status);

    Optional<ProductOwner> findByIdAndClientCompanyAndStatus(Long id, ClientCompany clientCompany, ProductOwnerStatus status);
}
