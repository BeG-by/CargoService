package by.itechart.cargo.model.freight;

import by.itechart.cargo.model.ClientCompany;
import by.itechart.cargo.model.User;
import by.itechart.cargo.model.enumeration.EnumTypePostgreSql;
import by.itechart.cargo.model.enumeration.InvoiceStatus;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
@Builder
@Table(name = "invoice")
@TypeDef(
        name = "invoice_status",
        typeClass = EnumTypePostgreSql.class
)
public class Invoice implements Serializable, Cloneable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_invoice")
    private Long id;

    @Column(name = "number", nullable = false)
    private String number;

    @Enumerated(EnumType.STRING)
    @Type(type = "invoice_status")
    @Column(name = "status")
    private InvoiceStatus invoiceStatus;

    @Column(name = "registration_date", nullable = false)
    private LocalDate registrationDate;

    @Column(name = "checking_date")
    private LocalDate checkingDate;

    @Column(name = "close_date")
    private LocalDate closeDate;

    @Column(name = "shipper", nullable = false)
    private String shipper;

    @Column(name = "consignee", nullable = false)
    private String consignee;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "id_product_owner", nullable = false)
    private ProductOwner productOwner;

    @JoinColumn(name = "id_driver", nullable = false)
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    private Driver driver;

    @OneToOne(mappedBy = "invoice")
    @JsonIgnore
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Waybill waybill;

    @Column(name = "id_waybill")
    private Long waybillId;

    @JoinColumn(name = "id_user_registration", nullable = false)
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference(value = "reg_invoice")
    private User registrationUser;

    @JoinColumn(name = "id_user_checking")
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference(value = "check_invoice")
    private User checkingUser;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "invoice", orphanRemoval = true)
    private List<Product> products;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_client_company", nullable = false)
    @JsonBackReference(value = "invoice_company")
    private ClientCompany clientCompany;

}
