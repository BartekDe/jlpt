package pl.jlpt.jlptapi.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Builder
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TestExerciseSolveAttempt {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @ManyToOne(targetEntity = AppUser.class)
    private AppUser user;

    @ManyToOne(targetEntity = Test.class)
    private Test test;

    @ManyToOne(targetEntity = Exercise.class)
    private Exercise exercise;

    private boolean isRight;
}
