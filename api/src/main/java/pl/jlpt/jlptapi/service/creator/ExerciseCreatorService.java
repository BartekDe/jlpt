package pl.jlpt.jlptapi.service.creator;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pl.jlpt.jlptapi.dto.request.creator.ExerciseCreatorDto;
import pl.jlpt.jlptapi.dto.response.ExerciseDto;
import pl.jlpt.jlptapi.entity.Exercise;
import pl.jlpt.jlptapi.repository.ExerciseRepository;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class ExerciseCreatorService {

    @Autowired
    EntityManager entityManager;

    @Autowired
    ExerciseRepository exerciseRepository;

    @Autowired
    ModelMapper modelMapper;

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

    public List<ExerciseDto> getExerciseList() {
        List<Exercise> exercises = this.exerciseRepository.findAll();
        return exercises.stream().map(exercise -> this.convertToDto(exercise))
                .collect(Collectors.toList());
    }

    private ExerciseDto convertToDto(Exercise exercise) {
        ExerciseDto exerciseDto = modelMapper.map(exercise, ExerciseDto.class);
        return exerciseDto;
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
