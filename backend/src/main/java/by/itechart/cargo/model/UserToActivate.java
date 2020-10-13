package by.itechart.cargo.model;

import by.itechart.cargo.model.enumeration.EnumTypePostgreSql;
import lombok.*;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;


@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Builder
@Table(name = "user_to_active")
@TypeDef(
        name = "role_enum",
        typeClass = EnumTypePostgreSql.class
)
public class UserToActivate extends BaseEntity {

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
    private Role.RoleType role;

}
