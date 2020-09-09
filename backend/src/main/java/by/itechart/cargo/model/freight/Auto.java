package by.itechart.cargo.model.freight;

import by.itechart.cargo.model.ClientCompany;
import by.itechart.cargo.model.enumeration.EnumTypePostgreSql;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;
import org.hibernate.annotations.TypeDef;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.List;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@TypeDef(
        name = "auto_enum",
        typeClass = EnumTypePostgreSql.class
)
@Table(name = "auto")
public class Auto implements Serializable, Cloneable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_auto")
    private Long id;

    @Column(name = "mark")
    private String mark;

    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    private AutoType autoType;

    @OneToMany(cascade = CascadeType.ALL , fetch = FetchType.LAZY , mappedBy = "auto")
    @JsonBackReference
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private List<Waybill> waybills;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_client_company", nullable = false)
    @JsonBackReference (value = "auto_company")
    @NotNull
    private ClientCompany clientCompany;
    
    public enum AutoType {
        EURO_TRACK,
        JUMBO,
        REFRIGERATOR
    }

}
