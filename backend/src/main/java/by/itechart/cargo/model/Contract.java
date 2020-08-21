package by.itechart.cargo.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "contracts")
public class Contract implements Serializable, Cloneable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_contract", insertable = true, updatable = false)
    private long id;

    @Column(name = "start_date", insertable = true, updatable = false)
    private LocalDate startDate;

    @Column(name = "expiration_date", insertable = true, updatable = false)
    private LocalDate expirationDate;

    @Column(name = "payment", insertable = true, updatable = false)
    private double payment;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_client_company", nullable = false)
    private ClientCompany clientCompany;
}