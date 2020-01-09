package pl.jlpt.jlptapi.controller;

import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import pl.jlpt.jlptapi.dto.request.creator.LessonCreatorDto;
import pl.jlpt.jlptapi.entity.Exercise;
import pl.jlpt.jlptapi.entity.Lesson;
import pl.jlpt.jlptapi.entity.LessonExerciseSolveAttempt;
import pl.jlpt.jlptapi.repository.LessonExerciseSolveAttemptRepository;
import pl.jlpt.jlptapi.repository.LessonRepository;
import pl.jlpt.jlptapi.service.LessonService;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;

@RestController
@RequestMapping("/creator/lesson")
public class LessonController {

    private LessonService lessonService;
    private LessonRepository lessonRepository;
    private EntityManager entityManager;
    private LessonExerciseSolveAttemptRepository lessonExerciseSolveAttemptRepository;

    public LessonController(
        LessonService lessonService,
        LessonRepository lessonRepository,
        EntityManager entityManager,
        LessonExerciseSolveAttemptRepository lessonExerciseSolveAttemptRepository
    ) {
        this.lessonService = lessonService;
        this.lessonRepository = lessonRepository;
        this.entityManager = entityManager;
        this.lessonExerciseSolveAttemptRepository = lessonExerciseSolveAttemptRepository;
    }

    @PostMapping
    public ResponseEntity createLesson(@RequestBody LessonCreatorDto lessonCreatorDto) {
        this.lessonService.createLesson(lessonCreatorDto);

        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/{lesson}")
    public ResponseEntity getLesson(@PathVariable Lesson lesson) {

        if (lesson == null) {
            throw new HttpClientErrorException(HttpStatus.NOT_FOUND, "Lesson not found");
        } else {
            List<LessonExerciseSolveAttempt> solveAttempts = this.lessonExerciseSolveAttemptRepository.findByLesson(lesson);
            for (Exercise exercise : lesson.getExercises()) {
                // use lesson attempt repository to check if exercise was already solved
                for (LessonExerciseSolveAttempt lessonExerciseSolveAttempt : solveAttempts) {
                    if (lessonExerciseSolveAttempt.getExercise().getId().equals(exercise.getId())) {
                        // exercise was already solved, so return the solve attempt and not regular version of the exercise
                        exercise.setRate(lessonExerciseSolveAttempt.getSelfEvaluation());
                    }
                }
            }
            return new ResponseEntity<>(lesson, HttpStatus.OK);
        }
    }

    @GetMapping("/all")
    public ResponseEntity getLessons() {

        List<Lesson> lessons = this.lessonRepository.findAll(
                Sort.by("number").ascending()
        );
        for (Lesson lesson : lessons) {
            List<LessonExerciseSolveAttempt> solveAttempts = this.lessonExerciseSolveAttemptRepository.findByLesson(lesson);
            for (Exercise exercise : lesson.getExercises()) {
                // use lesson attempt repository to check if exercise was already solved
                for (LessonExerciseSolveAttempt lessonExerciseSolveAttempt : solveAttempts) {
                    if (lessonExerciseSolveAttempt.getExercise().getId().equals(exercise.getId())) {
                        // exercise was already solved, so return the solve attempt and not regular version of the exercise
                        exercise.setRate(lessonExerciseSolveAttempt.getSelfEvaluation());
                    }
                }
            }
        }
        return new ResponseEntity<>(lessons, HttpStatus.OK);
    }

    @PutMapping("/{lesson}/increase-success-count")
    @Transactional
    public ResponseEntity increaseLessonSuccessCount(@PathVariable Lesson lesson) {

        if (lesson == null) {
            throw new HttpClientErrorException(HttpStatus.NOT_FOUND, "Lesson not found");
        }

        lesson.increaseSuccessCount(1);
        this.entityManager.persist(lesson);
        this.entityManager.flush();

        return new ResponseEntity(HttpStatus.OK);
    }

}
