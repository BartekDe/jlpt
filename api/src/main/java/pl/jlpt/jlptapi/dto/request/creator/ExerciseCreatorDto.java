package pl.jlpt.jlptapi.dto.request.creator;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ExerciseCreatorDto {

    private int number;
    private String name;
    private String content;
    private String answer1;
    private String answer2;
    private String answer3;
    private String answer4;
    private String answer5;
    private String correctAnswer;

}
