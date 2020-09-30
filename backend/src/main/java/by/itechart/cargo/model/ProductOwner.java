package by.itechart.cargo.model;

import by.itechart.cargo.model.enumeration.EnumTypePostgreSql;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "product_owner")
@TypeDef(
        name = "client_company_type",
        typeClass = EnumTypePostgreSql.class
)
@TypeDef(
        name = "product_owner_status",
        typeClass = EnumTypePostgreSql.class
)
@Builder
public class ProductOwner implements Serializable, Cloneable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_product_owner", nullable = false, updatable = false)
    private Long id;

    @Column(name = "name")
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    @Type(type = "client_company_type")     //todo: rename on refactor stage;
    private CompanyType type;


    @Enumerated(EnumType.STRING)
    @Type(type = "product_owner_status")
    @Column(name = "status", nullable = false)
    private Status status;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "country", column = @Column(nullable = false)),
            @AttributeOverride(name = "city", column = @Column(nullable = false)),
            @AttributeOverride(name = "street", column = @Column(nullable = false)),
            @AttributeOverride(name = "house", column = @Column(nullable = false)),
    })
    private Address address;

    @Column(name = "registration_date", nullable = false)
    //todo: date validation
    private LocalDate registrationDate;

    @Column(name = "phone")
    private String phone;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name = "id_client_company", nullable = false)
    @JsonIgnore
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private ClientCompany clientCompany;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "productOwner")
    @JsonIgnore
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private List<Invoice> invoices;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "productOwner")
    @JsonIgnore
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private List<Storage> storages;

    public enum CompanyType {
        SP, //Sole proprietorship
        JP //Juridical person
    }

    public enum Status {
        ACTIVE, DELETED
    }

}
