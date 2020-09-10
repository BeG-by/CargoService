package by.itechart.cargo.model.freight;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "point")
public class Point implements Serializable, Cloneable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_point")
    private Long id;

    @Column(name = "place")
    private String place;

    @Column(name = "passed")
    private boolean isPassed;

    @Column(name = "passage_date")
    private LocalDateTime passageDate;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "id_waybill")
    @JsonBackReference
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Waybill waybill;

}
