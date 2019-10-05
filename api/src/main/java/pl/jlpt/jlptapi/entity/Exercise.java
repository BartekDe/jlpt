package pl.jlpt.jlptapi.entity;

import lombok.Builder;
import pl.jlpt.jlptapi.entity.Lesson;

import javax.persistence.*;

@Builder
@Entity
public class Exercise {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String name;

    private int number;

    private String content;

    private String correctAnswer;

    private String answer1;

    private String answer2;

    private String answer3;

    private String answer4;

    private String answer5;

    private String contentImageURL;

    private String answerImage1;

    private String answerImage2;

    private String answerImage3;

    private String answerImage4;

    private String answerImage5;

    @ManyToOne(targetEntity = Lesson.class)
    private Lesson fkLesson;
}
