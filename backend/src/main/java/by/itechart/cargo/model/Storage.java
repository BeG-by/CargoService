package by.itechart.cargo.model;

import by.itechart.cargo.model.enumeration.EnumTypePostgreSql;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Builder
@Table(name = "storage")
@TypeDef(name = "storage_status", typeClass = EnumTypePostgreSql.class)
public class Storage extends BaseEntity implements Serializable, Cloneable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_storage")
    private Long id;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "country", column = @Column(nullable = false)),
            @AttributeOverride(name = "city", column = @Column(nullable = false)),
            @AttributeOverride(name = "street", column = @Column(nullable = false)),
            @AttributeOverride(name = "house", column = @Column(nullable = false)),
    })
    private Address address;

    @Column(name = "phone", nullable = false)
    private String phone;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    @Type(type = "storage_status")
    private Status status;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "id_client_company")
    @JsonIgnore
    private ClientCompany clientCompany;

    public enum Status {
        ACTIVE,
        DELETED
    }

}
