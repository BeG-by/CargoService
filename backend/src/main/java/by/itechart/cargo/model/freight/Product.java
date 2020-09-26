package by.itechart.cargo.model.freight;

import by.itechart.cargo.model.enumeration.EnumTypePostgreSql;
import by.itechart.cargo.model.enumeration.Status;
import by.itechart.cargo.model.enumeration.product.Currency;
import by.itechart.cargo.model.enumeration.product.MassMeasure;
import by.itechart.cargo.model.enumeration.product.QuantityMeasure;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.math.BigDecimal;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "product")
@TypeDef(name = "product_status", typeClass = EnumTypePostgreSql.class)
@TypeDef(name = "mass_measure", typeClass = EnumTypePostgreSql.class)
@TypeDef(name = "quantity_measure", typeClass = EnumTypePostgreSql.class)
@TypeDef(name = "currency", typeClass = EnumTypePostgreSql.class)
public class Product implements Serializable, Cloneable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_product", nullable = false, updatable = false)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long id;

    @Column(name = "name", nullable = false)
    @NotBlank(message = "Name is mandatory")
    @Size(max = 64, message = "Name is too long (max is 64)")
    private String name;

    @Column(name = "quantity", nullable = false)
    @Positive(message = "Quantity must be more than 1")
    private Integer quantity;

    @Enumerated(EnumType.STRING)
    @Column(name = "quantity_measure", nullable = false)
    @Type(type = "quantity_measure")
    private QuantityMeasure quantityMeasure;

    @Enumerated(EnumType.STRING)
    @Column(name = "mass_measure", nullable = false)
    @Type(type = "mass_measure")
    private MassMeasure massMeasure;

    @Enumerated(EnumType.STRING)
    @Column(name = "currency", nullable = false)
    @Type(type = "currency")
    private Currency currency;

    @Column(name = "price", nullable = false)
    @Positive(message = "Price must be more than 1")
    private BigDecimal price;

    @Column(name = "mass", nullable = false)
    @NotBlank(message = "Mass is mandatory")
    @Size(max = 16, message = "Mass is too long (max is 16)")
    private String mass;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    @Type(type = "product_status")
    private Status productStatus;   //todo: validation???

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "id_invoice")
    @JsonIgnore
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Invoice invoice;


}
