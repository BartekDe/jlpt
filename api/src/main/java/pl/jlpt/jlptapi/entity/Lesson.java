package pl.jlpt.jlptapi.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Builder
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Lesson {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(length = 10485760)
    private String theory;

    private String name;

    private int number;

    private int successCount;

    @ManyToMany(targetEntity = Exercise.class)
    private List<Exercise> exercises;

    @Column(nullable = true)
    private boolean isTheorySeen;

    public void increaseSuccessCount(int count) {
        this.successCount += count;
    }
}
