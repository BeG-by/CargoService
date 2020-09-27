package by.itechart.cargo.model.freight;

import by.itechart.cargo.model.enumeration.EnumTypePostgreSql;
import by.itechart.cargo.model.enumeration.Status;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import javax.validation.constraints.*;
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
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long id;

    @Column(name = "name", nullable = false)
    @NotBlank(message = "Name is mandatory")
    @Size(max = 64 , message = "Name is too long (max is 64)")
    private String name;

    @Column(name = "quantity", nullable = false)
    @Positive(message = "Quantity must be more than 0")
    private Integer quantity;

    @Column(name = "measure", nullable = false)
    @NotBlank(message = "Measure is mandatory")
    @Size(max = 12 , message = "Measure is too long (max is 12)")
    private String measure;

    @Column(name = "price", nullable = false)
    @Positive(message = "Price must be more than 1")
    private Long price;

    @Column(name = "comment")
    @Size(max = 500, message = "Comment length is greater than 500 symbols")
    private String comment;

    @Column(name = "lost_quantity")
    @Positive (message = "Quantity must be more than 0")
    private Integer lostQuantity;

    @Column(name = "mass", nullable = false)
    @NotBlank(message = "Mass is mandatory")
    @Size(max = 16 , message = "Mass is too long (max is 16)")
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
