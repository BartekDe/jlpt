package pl.jlpt.jlptapi.controller;

import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import pl.jlpt.jlptapi.dto.request.creator.LessonCreatorDto;
import pl.jlpt.jlptapi.entity.*;
import pl.jlpt.jlptapi.repository.LessonExerciseSolveAttemptRepository;
import pl.jlpt.jlptapi.repository.LessonRepository;
import pl.jlpt.jlptapi.repository.TheoryOnLessonRepository;
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
    private TheoryOnLessonRepository theoryOnLessonRepository;

    public LessonController(
            LessonService lessonService,
            LessonRepository lessonRepository,
            EntityManager entityManager,
            LessonExerciseSolveAttemptRepository lessonExerciseSolveAttemptRepository,
            TheoryOnLessonRepository theoryOnLessonRepository) {
        this.lessonService = lessonService;
        this.lessonRepository = lessonRepository;
        this.entityManager = entityManager;
        this.lessonExerciseSolveAttemptRepository = lessonExerciseSolveAttemptRepository;
        this.theoryOnLessonRepository = theoryOnLessonRepository;
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
    public ResponseEntity getLessons(@AuthenticationPrincipal AppUser appUser) {

        List<Lesson> lessons = this.lessonRepository.findAll(
                Sort.by("number").ascending()
        );
        for (Lesson lesson : lessons) {
            List<LessonExerciseSolveAttempt> solveAttempts = this.lessonExerciseSolveAttemptRepository.findByLesson(lesson);
            for (Exercise exercise : lesson.getExercises()) {
                // use lesson attempt repository to check if exercise was already solved
                for (LessonExerciseSolveAttempt lessonExerciseSolveAttempt : solveAttempts) {
                    if (lessonExerciseSolveAttempt.getExercise().getId().equals(exercise.getId())
                        && lessonExerciseSolveAttempt.getUser().getId().equals(appUser.getId())
                    ) {
                        // exercise was already solved, so return the solve attempt and not regular version of the exercise
                        exercise.setRate(lessonExerciseSolveAttempt.getSelfEvaluation());
                    }
                }
            }
            List<TheoryOnLesson> theoryOnLessons = this.theoryOnLessonRepository.findByLesson(lesson);
            for (TheoryOnLesson theoryOnLesson : theoryOnLessons) {
                if (theoryOnLesson.getLesson().getId().equals(lesson.getId())
                    && theoryOnLesson.getAppUser().getId().equals(appUser.getId())
                ) {
                    lesson.setIsTheorySeen(true);
                }
            }
        }

        return new ResponseEntity<>(lessons, HttpStatus.OK);
    }

    @PostMapping("/theory/{lesson}")
    @Transactional
    public ResponseEntity userHaveSeenTheory(@PathVariable Lesson lesson, @AuthenticationPrincipal AppUser user) {

        TheoryOnLesson theoryOnLesson = TheoryOnLesson.builder().lesson(lesson).appUser(user).build();

        this.entityManager.persist(theoryOnLesson);
        this.entityManager.flush();

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/{lesson}/increase-success-count")
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
