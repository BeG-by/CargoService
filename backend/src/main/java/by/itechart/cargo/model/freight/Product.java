package by.itechart.cargo.model.freight;

import by.itechart.cargo.model.enumeration.EnumTypePostgreSql;
import by.itechart.cargo.model.enumeration.Status;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "product")
@TypeDef(
        name = "product_status",
        typeClass = EnumTypePostgreSql.class
)
public class Product implements Serializable, Cloneable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_product", nullable = false, updatable = false)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @Column(name = "measure", nullable = false)
    private String measure;

    @Column(name = "price", nullable = false)
    private Long price;

    @Column(name = "sum", nullable = false)
    private Long sum;

    @Column(name = "mass", nullable = false)
    private String mass;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    @Type(type = "product_status")
    private Status productStatus;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "id_invoice")
    @JsonIgnore
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Invoice invoice;


}
