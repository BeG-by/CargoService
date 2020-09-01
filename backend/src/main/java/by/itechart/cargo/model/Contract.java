package by.itechart.cargo.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "contracts")
public class Contract implements Serializable, Cloneable {

    private static final long serialVersionUID = 1238378954432122692L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_contract", nullable = false, updatable = false)
    @NotNull
    private Long id;

    @Column(name = "start_date", nullable = false)
    @NotNull
    private LocalDate startDate;

    @Column(name = "expiration_date", nullable = false)
    @NotNull
    private LocalDate expirationDate;

    @Column(name = "payment", nullable = false)
    @NotNull
    @Min(0)
    private BigDecimal payment;

    @JsonBackReference
    @Column(name = "id_client_company", nullable = false)
    @NotNull
    private Long clientCompanyId;
}
