package pl.jlpt.jlptapi.entity;

import lombok.Builder;

import javax.persistence.*;

@Builder
@Entity
public class ExerciseSet {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @ManyToOne(targetEntity = Lesson.class)
    private Lesson fkLesson;

    private String name;

    // TODO: foreign key to the user table? is this necessary?
}
