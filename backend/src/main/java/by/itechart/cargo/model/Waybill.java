package by.itechart.cargo.model;

import by.itechart.cargo.model.enumeration.EnumTypePostgreSql;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "waybill")
@TypeDef(
        name = "waybill_status",
        typeClass = EnumTypePostgreSql.class
)
public class Waybill implements Serializable, Cloneable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_waybill")
    private Long id;

    @Column(name = "departure_date", nullable = false)
    private LocalDate departureDate;

    @Column(name = "arrival_date")
    private LocalDate arrivalDate;

    @Column(name = "distance")
    private Double distance;

    @JoinColumn(name = "id_auto", nullable = false)
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    private Auto auto;

    @JoinColumn(name = "id_invoice")
    @OneToOne(cascade = CascadeType.ALL)
    private Invoice invoice;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "waybill")
    @JsonManagedReference
    private List<Point> points;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_client_company", nullable = false)
    @JsonBackReference(value = "waybill_company")
    private ClientCompany clientCompany;

    @Enumerated(EnumType.STRING)
    @Type(type = "waybill_status")
    @Column(name = "waybill_status")
    private Waybill.WaybillStatus status;

    public enum WaybillStatus {
        CURRENT, FUTURE, DONE
    }
}

