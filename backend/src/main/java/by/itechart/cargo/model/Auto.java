package by.itechart.cargo.model;

import by.itechart.cargo.model.enumeration.EnumTypePostgreSql;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;



@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@TypeDef(name = "auto_type", typeClass = EnumTypePostgreSql.class)
@TypeDef(name = "auto_status", typeClass = EnumTypePostgreSql.class)
@Table(name = "auto")
public class Auto extends BaseEntity implements Serializable, Cloneable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_auto")
    private Long id;

    @Column(name = "mark", nullable = false)
    private String mark;

    @Column(name = "number", nullable = false)
    private String number;

    @Column(name = "type", nullable = false)
    @Enumerated(EnumType.STRING)
    @Type(type = "auto_type")
    private AutoType autoType;

    @Column(name = "consumption", nullable = false)
    private BigDecimal consumption;

    @Column(name = "max_load", nullable = false)
    private Integer maxLoad;

    @Column(name = "issue_date")
    private LocalDate dateOfIssue;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    @Type(type = "auto_status")
    private Status status;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "auto")
    @JsonBackReference
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private List<Waybill> waybills;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_client_company", nullable = false)
    @JsonIgnore
    @NotNull
    private ClientCompany clientCompany;

    public enum AutoType {
        EURO_TRACK,
        JUMBO,
        REFRIGERATOR
    }

    public enum Status {
        ACTIVE,
        BROKEN,
        DELETED
    }

}
