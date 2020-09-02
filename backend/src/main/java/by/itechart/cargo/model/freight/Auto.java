package by.itechart.cargo.model.freight;

import by.itechart.cargo.model.ClientCompany;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
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
    private List<Driver> drivers;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_client_company", nullable = false)
    @JsonBackReference
    @NotNull
    private ClientCompany clientCompany;

    public enum AutoType {
        EURO_TRACK,
        JUMBO,
        REFRIGERATOR
    }

}
