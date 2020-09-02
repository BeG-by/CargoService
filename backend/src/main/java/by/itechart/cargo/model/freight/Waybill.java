package by.itechart.cargo.model.freight;

import by.itechart.cargo.model.ClientCompany;
import by.itechart.cargo.model.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
@Table(name = "waybill")
public class Waybill implements Serializable, Cloneable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_waybill")
    private Long id;

    @Column(name = "number", nullable = false)
    @NotBlank
    private String number;

    @Column(name = "registration_date", nullable = false)
    @NotNull
    private LocalDate registrationDate;

    @Column(name = "checking_date")
    private LocalDate checkingDate;

    @Column(name = "close_date")
    private LocalDate closeDate;

    @Column(name = "shipper", nullable = false)
    @NotBlank
    private String shipper;

    @Column(name = "consignee", nullable = false)
    @NotNull
    private String consignee;

    @JoinColumn(name = "id_driver", nullable = false)
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    private Driver driver;

    @JoinColumn(name = "id_user_registration", nullable = false)
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    private User registrationUser;

    @JoinColumn(name = "id_user_checking")
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    private User checkingUser;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "waybill")
    @JsonManagedReference
    private List<Product> products;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_client_company", nullable = false)
    @JsonBackReference
    @NotNull
    private ClientCompany clientCompany;

}
