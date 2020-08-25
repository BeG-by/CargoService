package by.itechart.cargo.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "client_companies")
public class ClientCompany implements Serializable, Cloneable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_client_company", nullable = false, updatable = false)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private Type type;

    @Column(name = "pan", nullable = false)
    private String payerAccountNumber;


    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "country", column = @Column(nullable = false)),
            @AttributeOverride(name = "city", column = @Column(nullable = false)),
            @AttributeOverride(name = "street", column = @Column(nullable = false)),
            @AttributeOverride(name = "house", column = @Column(nullable = false)),
            @AttributeOverride(name = "flat", column = @Column(nullable = false))
    })
    private Address address;

    @Column(name = "registration_date", nullable = false)
    private LocalDate registrationDate;

    @Column(name = "email", nullable = false)
    private String email;

    @JsonManagedReference
    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_client_company")
    private List<User> users = new ArrayList<>();

    @JsonManagedReference
    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_client_company")
    @ToString.Exclude
    private List<Contract> contracts = new ArrayList<>();

    public enum Type {
        SP, //Sole proprietorship
        JP //Juridical person
    }
}
