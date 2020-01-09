package pl.jlpt.jlptapi.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Date;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
public class DailyExerciseSet {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    Long id;

    Date date;

    @ManyToMany(targetEntity = Exercise.class)
    List<Exercise> exercises;

}
