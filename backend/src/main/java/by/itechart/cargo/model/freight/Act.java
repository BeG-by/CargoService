package by.itechart.cargo.model.freight;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "act")
public class Act implements Serializable, Cloneable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_act")
    private Long id;

    @Column(name = "consignee_worker", nullable = false)
    private String consigneeWorker;

    @Column(name = "registration_date", nullable = false)
    private LocalDate registrationDate;

    @JoinColumn(name = "id_invoice")
    @OneToOne(cascade = CascadeType.ALL)
    private Invoice invoice;

}


