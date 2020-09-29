package by.itechart.cargo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.PastOrPresent;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.LocalDate;

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

    @NotBlank(message = "Latitude is mandatory")
    @Size(max = 32, message = "Latitude length is too long")
    @Column(name = "latitude")
    private String latitude;

    @NotBlank(message = "Longitude is mandatory")
    @Size(max = 32, message = "Longitude length is too long")
    @Column(name = "longitude")
    private String longitude;

    @Column(name = "passed")
    private boolean isPassed;

    @PastOrPresent(message = "Passage date must be past or present date")
    @Column(name = "passage_date")
    private LocalDate passageDate;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "id_waybill", nullable = false)
    @JsonIgnore
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Waybill waybill;

}
