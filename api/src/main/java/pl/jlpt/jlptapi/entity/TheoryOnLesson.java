package pl.jlpt.jlptapi.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TheoryOnLesson {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @OneToOne(targetEntity = Lesson.class)
    private Lesson lesson;

    @OneToOne(targetEntity = AppUser.class)
    private AppUser appUser;
}
