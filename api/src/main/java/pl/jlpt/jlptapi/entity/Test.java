package pl.jlpt.jlptapi.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;

@Entity
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Test {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private Timestamp creationTime;

    private int timeLimit;

    private String name;

    @ManyToMany(targetEntity = Exercise.class)
    private List<Exercise> exercises;

}
