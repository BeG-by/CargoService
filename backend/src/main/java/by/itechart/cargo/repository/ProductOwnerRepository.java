package by.itechart.cargo.repository;

import by.itechart.cargo.model.ClientCompany;
import by.itechart.cargo.model.ProductOwner;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductOwnerRepository extends JpaRepository<ProductOwner, Long> {

    Integer countAllByClientCompanyAndStatus(ClientCompany clientCompany, ProductOwner.Status status);

    List<ProductOwner> findAllByClientCompanyAndStatus(ClientCompany clientCompany, ProductOwner.Status status, Pageable pageable);

    List<ProductOwner> findByIdIsIn(List<Long> ids);

    Optional<ProductOwner> findByNameAndClientCompanyAndStatus(String name, ClientCompany clientCompany, ProductOwner.Status status);

    Optional<ProductOwner> findByIdAndClientCompanyAndStatus(Long id, ClientCompany clientCompany, ProductOwner.Status status);
}
