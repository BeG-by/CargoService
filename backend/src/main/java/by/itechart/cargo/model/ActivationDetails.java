package by.itechart.cargo.model;

import by.itechart.cargo.model.enumeration.EnumTypePostgreSql;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import javax.validation.constraints.NotNull;


@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Builder
@Table(name = "activation")
@TypeDef(
        name = "role_enum",
        typeClass = EnumTypePostgreSql.class
)
public class ActivationDetails extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String email;

    @Column(name = "code", nullable = false)
    private String activationCode;

    @Column(name = "active", nullable = false)
    private boolean isActive;

    @Column(name = "role", nullable = false)
    @Type(type = "role_enum")
    @Enumerated(EnumType.STRING)
    private Role.RoleType role;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_client_company", nullable = false)
    @JsonIgnore
    private ClientCompany clientCompany;

}
