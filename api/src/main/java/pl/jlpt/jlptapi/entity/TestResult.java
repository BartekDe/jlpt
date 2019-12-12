package pl.jlpt.jlptapi.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TestResult {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @ManyToOne(targetEntity = Test.class)
    private Long testId;

    @ManyToOne(targetEntity = AppUser.class)
    private Long AppUserId;

    private Timestamp date;

    private int score;

}
