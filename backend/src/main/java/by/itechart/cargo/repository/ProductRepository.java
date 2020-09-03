package by.itechart.cargo.repository;

import by.itechart.cargo.model.freight.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
