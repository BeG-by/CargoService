package by.itechart.cargo.model;

import by.itechart.cargo.model.enumeration.CompanyType;
import by.itechart.cargo.model.freight.Auto;
import by.itechart.cargo.model.freight.Driver;
import by.itechart.cargo.model.freight.Invoice;
import by.itechart.cargo.model.freight.ProductOwner;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "client_company")
public class ClientCompany implements Serializable, Cloneable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_client_company", nullable = false, updatable = false)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private CompanyType type;

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

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "clientCompany")
    @JsonManagedReference(value = "client_company")
    private List<User> users;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "clientCompany")
    @JsonManagedReference
    private List<Contract> contracts;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "clientCompany")
    @JsonManagedReference(value = "owners_company")
    private List<ProductOwner> productOwners;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "clientCompany")
    @JsonManagedReference(value = "invoice_company")
    private List<Invoice> invoices;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "clientCompany")
    @JsonManagedReference(value = "auto_company")
    private List<Auto> autos;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "clientCompany")
    @JsonManagedReference(value = "driver_company")
    private List<Driver> drivers;

    public ClientCompany(Long id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "ClientCompany{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", type=" + type +
                ", payerAccountNumber='" + payerAccountNumber + '\'' +
                ", address=" + address +
                ", registrationDate=" + registrationDate +
                ", email='" + email + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ClientCompany that = (ClientCompany) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(name, that.name) &&
                type == that.type &&
                Objects.equals(payerAccountNumber, that.payerAccountNumber) &&
                Objects.equals(address, that.address) &&
                Objects.equals(registrationDate, that.registrationDate) &&
                Objects.equals(email, that.email);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, type, payerAccountNumber, address, registrationDate, email);
    }

}
