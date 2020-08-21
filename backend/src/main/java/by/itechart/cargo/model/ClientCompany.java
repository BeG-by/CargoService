package by.itechart.cargo.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "client_companies")
public class ClientCompany implements Serializable, Cloneable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_client_company", insertable = true, nullable = false)
    private long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private ClientCompanyType type;

    @Column(name = "pan")
    private String payerAccountNumber;

    @Column(name = "country")
    private String country;

    @Column(name = "city")
    private String city;

    @Column(name = "street")
    private String street;

    @Column(name = "house")
    private String house;

    @Column(name = "flat")
    private String flat;

    @Column(name = "registration_date")
    private LocalDate registrationDate;

    @Column(name = "email")
    private String email;

    @JsonManagedReference
    @OneToMany(mappedBy = "clientCompany", fetch = FetchType.LAZY)
    private Set<User> users = new HashSet<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "clientCompany", fetch = FetchType.LAZY)
    private Set<Contract> contacts = new HashSet<>();

    public enum ClientCompanyType {
        SP, //Sole proprietorship
        JP; //Juridical person
    }
}
