package pl.jlpt.jlptapi.service.creator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pl.jlpt.jlptapi.dto.request.creator.ExerciseCreatorDto;
import pl.jlpt.jlptapi.entity.Exercise;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

@Component
public class ExerciseCreatorService {

    @Autowired
    EntityManager entityManager;

    @Transactional
    public Exercise createExercise(ExerciseCreatorDto exerciseCreatorDto) {

        Exercise newExercise = new Exercise();
        newExercise = this.createOrUpdateExercise(newExercise, exerciseCreatorDto);

        entityManager.persist(newExercise);
        entityManager.flush();

        return newExercise;
    }

    public Exercise editExercise(Exercise exercise, ExerciseCreatorDto exerciseCreatorDto) {
        exercise = this.createOrUpdateExercise(exercise, exerciseCreatorDto);

        entityManager.persist(exercise);
        entityManager.flush();

        return exercise;
    }

    private Exercise createOrUpdateExercise(Exercise exercise, ExerciseCreatorDto exerciseCreatorDto) {
        exercise.setContent(exerciseCreatorDto.getContent());
        exercise.setContentImage(exerciseCreatorDto.getContentImage());
        exercise.setType(exerciseCreatorDto.getType());
        exercise.setAnswer1(exerciseCreatorDto.getAnswer1());
        exercise.setAnswer2(exerciseCreatorDto.getAnswer2());
        exercise.setAnswer3(exerciseCreatorDto.getAnswer3());
        exercise.setAnswer4(exerciseCreatorDto.getAnswer4());
        exercise.setAnswer5(exerciseCreatorDto.getAnswer5());
        exercise.setNumber(exerciseCreatorDto.getNumber());
        exercise.setName(exerciseCreatorDto.getName());
        exercise.setCorrectAnswer(exerciseCreatorDto.getCorrectAnswer());

        return exercise;
    }
}
