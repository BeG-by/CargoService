package by.itechart.cargo.model.freight;

import by.itechart.cargo.model.ClientCompany;
import by.itechart.cargo.model.User;
import by.itechart.cargo.model.enumeration.EnumTypePostgreSql;
import by.itechart.cargo.model.enumeration.WaybillStatus;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "waybill")
@TypeDef(
        name = "waybill_status",
        typeClass = EnumTypePostgreSql.class
)
public class Waybill implements Serializable, Cloneable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_waybill")
    private Long id;

    @Column(name = "number", nullable = false)
    private String number;

    @Enumerated(EnumType.STRING)
    @Type(type = "waybill_status")
    @Column(name = "status")
    private WaybillStatus waybillStatus;

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

    @JoinColumn(name = "id_driver", nullable = false)
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    private Driver driver;

    @JoinColumn(name = "id_user_registration", nullable = false)
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference(value = "reg_waybill")
    private User registrationUser;

    @JoinColumn(name = "id_user_checking")
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference(value = "check_waybill")
    private User checkingUser;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "waybill")
    private List<Product> products;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_client_company", nullable = false)
    @JsonBackReference(value = "waybill_company")
    private ClientCompany clientCompany;

}
