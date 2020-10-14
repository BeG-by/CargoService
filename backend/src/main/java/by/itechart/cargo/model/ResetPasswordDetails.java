package by.itechart.cargo.model;


import lombok.*;

import javax.persistence.*;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Builder
@Table(name = "password_reset")
public class ResetPasswordDetails extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String email;

    @Column(name = "code", nullable = false)
    private String activationCode;

    @Column(name = "reset", nullable = false)
    private boolean isReset;


}
