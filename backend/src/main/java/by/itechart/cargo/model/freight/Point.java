package by.itechart.cargo.model.freight;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PastOrPresent;
import javax.validation.constraints.Size;
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

    @NotBlank(message = "Place is mandatory")
    @Size(max = 255, message = "Place length is too long")
    @Column(name = "place")
    private String place;

    @Column(name = "passed")
    private boolean isPassed;

    @PastOrPresent(message = "Passage date must be past or present date")
    @Column(name = "passage_date")
    private LocalDateTime passageDate;

    @NotNull(message = "Waybill id is mandatory")
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "id_waybill", nullable = false)
    @JsonBackReference
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Waybill waybill;

}
