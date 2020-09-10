package by.itechart.cargo.model;

import by.itechart.cargo.model.enumeration.CompanyType;

import by.itechart.cargo.model.freight.*;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import by.itechart.cargo.model.enumeration.EnumTypePostgreSql;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;


import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "client_company")
@TypeDef(
        name = "client_company_type",
        typeClass = EnumTypePostgreSql.class
)
public class ClientCompany implements Serializable, Cloneable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_client_company", nullable = false, updatable = false)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "type", nullable = false)
    @Enumerated(EnumType.STRING)
    @Type(type = "client_company_type")
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
    @JsonIgnore
    private List<User> users;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "clientCompany")
    @JsonIgnore
    private List<Contract> contracts;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "clientCompany")
    @JsonIgnore
    private List<ProductOwner> productOwners;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "clientCompany")
    @JsonIgnore
    private List<Invoice> invoices;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "clientCompany")
    @JsonIgnore
    private List<Waybill> waybills;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "clientCompany")
    @JsonIgnore
    private List<Auto> autos;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "clientCompany")
    @JsonIgnore
    private List<Driver> drivers;


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
