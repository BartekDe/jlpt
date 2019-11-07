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
        newExercise.setContent(exerciseCreatorDto.getContent());
        newExercise.setAnswer1(exerciseCreatorDto.getAnswer());
        newExercise.setNumber(exerciseCreatorDto.getNumber());
        newExercise.setName(exerciseCreatorDto.getName());
        newExercise.setCorrectAnswer(exerciseCreatorDto.getCorrectAnswer());

        entityManager.persist(newExercise);
        entityManager.flush();

        return newExercise;
    }

}
