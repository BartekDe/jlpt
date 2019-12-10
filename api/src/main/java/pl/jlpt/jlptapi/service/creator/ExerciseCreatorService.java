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

    private EntityManager entityManager;
    private ExerciseRepository exerciseRepository;
    private ModelMapper modelMapper;

    public ExerciseCreatorService(
        EntityManager entityManager,
        ExerciseRepository exerciseRepository,
        ModelMapper modelMapper
    ) {
        this.entityManager = entityManager;
        this.exerciseRepository = exerciseRepository;
        this.modelMapper = modelMapper;
    }

    @Transactional
    public Exercise createExercise(ExerciseCreatorDto exerciseCreatorDto) {

        Exercise newExercise = this.createOrUpdateExercise(new Exercise(), exerciseCreatorDto);

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

    public List<Exercise> getExerciseList() {
        return this.exerciseRepository.findAll();
    }

    private ExerciseDto convertToDto(Exercise exercise) {
        return modelMapper.map(exercise, ExerciseDto.class);
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
