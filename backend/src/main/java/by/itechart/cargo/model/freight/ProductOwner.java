package by.itechart.cargo.model.freight;

import by.itechart.cargo.model.Address;
import by.itechart.cargo.model.ClientCompany;
import by.itechart.cargo.model.enumeration.CompanyType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "product_owner")
public class ProductOwner implements Serializable, Cloneable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_product_owner", nullable = false, updatable = false)
    private Long id;

    @Column(name = "name")
    @NotBlank(message = "Password is mandatory")
    @Size(max = 64 , message = "Name is too long (max is 64)")
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    //todo: enum validation
    private CompanyType type;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "country", column = @Column(nullable = false)),
            @AttributeOverride(name = "city", column = @Column(nullable = false)),
            @AttributeOverride(name = "street", column = @Column(nullable = false)),
            @AttributeOverride(name = "house", column = @Column(nullable = false)),
    })
    @Valid
    private Address address;

    @Column(name = "registration_date", nullable = false)
    //todo: date validation
    private LocalDate registrationDate;

    @Column(name = "phone")
    @Size(max = 64 , message = "Phone is too long (max is 64)")
    private String phone;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
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
}
