package by.itechart.cargo.model;

import by.itechart.cargo.model.freight.DeliveryNote;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import org.hibernate.annotations.Proxy;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "user" , schema = "public")
//@Proxy(lazy = false)
public class User implements Serializable, Cloneable {

    private static final long serialVersionUID = 2888798985824900383L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_user", nullable = false, updatable = false)
    @NotNull
    private Long id;

    @Column(name = "login", unique = true, nullable = false)
    @NotBlank(message = "Login is mandatory")
    @Size(max = 64)
    private String login;

    @Column(name = "password", nullable = false)
    @NotBlank(message = "Password is mandatory")
    @Size(max = 64)
    private String password;

    @Column(name = "name", nullable = false)
    @NotBlank(message = "Name is mandatory")
    @Size(max = 64)
    private String name;

    @Column(name = "surname", nullable = false)
    @NotBlank(message = "Surname is mandatory")
    @Size(max = 64)
    private String surname;

    @Column(name = "patronymic", nullable = false)
    @NotBlank(message = "Patronymic is mandatory")
    @Size(max = 64)
    private String patronymic;

    @Column(name = "birthday")
    private LocalDate birthday;

    @Embedded
    @Valid
    @NotNull
    private Address address;

    @Column(name = "email")
    @Email
    @Size(max = 64)
    private String email;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_client_company", nullable = false)
    @JsonBackReference
    @NotNull
    private ClientCompany clientCompany;

    @JsonManagedReference
    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    @JoinTable(
            name = "user_role",
            joinColumns = {@JoinColumn(name = "id_user")},
            inverseJoinColumns = {@JoinColumn(name = "id_role")}
    )
    Set<Role> roles = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "registrationUser")
    @JsonBackReference
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private List<DeliveryNote> registrationDeliveryNote;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "checkingUser")
    @JsonBackReference
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private List<DeliveryNote> checkingDeliveryNote;

}
