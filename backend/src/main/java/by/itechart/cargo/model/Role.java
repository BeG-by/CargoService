package by.itechart.cargo.model;

import by.itechart.cargo.model.enumeration.EnumTypePostgreSql;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "role")
@TypeDef(
        name = "role_enum",
        typeClass = EnumTypePostgreSql.class
)
public class Role implements Serializable, Cloneable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_role", nullable = false, updatable = false)
    private Integer roleId;

    @Enumerated(EnumType.STRING)
    @Type(type = "role_enum")
    @Column(name = "role", unique = true, nullable = false)
    private RoleType role;

    @JsonBackReference(value = "user_role")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @ManyToMany(mappedBy = "roles", fetch = FetchType.LAZY)
    private Set<User> users;


    public enum RoleType {
        SYSADMIN,
        ADMIN,
        MANAGER,
        DISPATCHER,
        DRIVER,
        OWNER
    }
}


