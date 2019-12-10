package pl.jlpt.jlptapi.service;

import org.springframework.stereotype.Component;
import pl.jlpt.jlptapi.dto.request.creator.LessonCreatorDto;
import pl.jlpt.jlptapi.entity.Exercise;
import pl.jlpt.jlptapi.entity.Lesson;
import pl.jlpt.jlptapi.repository.ExerciseRepository;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;

@Component
public class LessonService {

    private ExerciseRepository exerciseRepository;
    private EntityManager entityManager;

    public LessonService(
        ExerciseRepository exerciseRepository,
        EntityManager entityManager
    ) {
        this.exerciseRepository = exerciseRepository;
        this.entityManager = entityManager;
    }

    @Transactional
    public Lesson createLesson(LessonCreatorDto lessonCreatorDto) {

        List<Exercise> exercises = this.exerciseRepository
                .findAllById(lessonCreatorDto.getExerciseIds());

        Lesson lesson = Lesson.builder()
                .theory(lessonCreatorDto.getTheory())
                .name(lessonCreatorDto.getName())
                .exercises(exercises)
                .build();

        this.entityManager.persist(lesson);
        this.entityManager.flush();

        return lesson;
    }
}
