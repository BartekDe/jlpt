package pl.jlpt.jlptapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import pl.jlpt.jlptapi.dto.request.ExerciseAttemptDto;
import pl.jlpt.jlptapi.entity.*;
import pl.jlpt.jlptapi.repository.ExerciseRepository;
import pl.jlpt.jlptapi.repository.ExerciseSolveAttemptRepository;
import pl.jlpt.jlptapi.repository.LessonRepository;
import pl.jlpt.jlptapi.repository.TestRepository;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;

@RestController
public class SolveExerciseController {

    @Autowired
    private ExerciseRepository exerciseRepository;

    @Autowired
    private LessonRepository lessonRepository;

    @Autowired
    private TestRepository testRepository;

    @Autowired
    private ExerciseSolveAttemptRepository exerciseSolveAttemptRepository;

    @Autowired
    private EntityManager entityManager;

    @PostMapping("/lesson/solve-exercise")
    @Transactional
    public ResponseEntity solveLessonsExercise(@RequestBody ExerciseAttemptDto exerciseAttemptDto, @AuthenticationPrincipal AppUser user) {

        Exercise exercise = this.exerciseRepository.getOne(exerciseAttemptDto.exerciseId);
        Lesson lesson = this.lessonRepository.getOne(exerciseAttemptDto.lessonId);

        ExerciseSolveAttempt exerciseSolveAttempt = ExerciseSolveAttempt.builder()
                .user(user)
                .exercise(exercise)
                .lesson(lesson)
                .isRight(exerciseAttemptDto.correct)
                .selfEvaluation(exerciseAttemptDto.rate)
                .build();

        this.entityManager.persist(exerciseSolveAttempt);
        this.entityManager.flush();

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/test/solve-exercise")
    @Transactional
    public ResponseEntity solveTestsExercise(@RequestBody ExerciseAttemptDto exerciseAttemptDto, @AuthenticationPrincipal AppUser user) {

        Exercise exercise = this.exerciseRepository.getOne(exerciseAttemptDto.exerciseId);
        Test test = this.testRepository.getOne(exerciseAttemptDto.testId);

        ExerciseSolveAttempt exerciseSolveAttempt = ExerciseSolveAttempt.builder()
                .user(user)
                .exercise(exercise)
                .test(test)
                .isRight(exerciseAttemptDto.correct)
                .selfEvaluation(exerciseAttemptDto.rate)
                .build();

        this.entityManager.persist(exerciseSolveAttempt);
        this.entityManager.flush();

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/test/{test}/finish")
    @Transactional
    public ResponseEntity finishSolvingTest(@PathVariable Test test, @AuthenticationPrincipal AppUser user) {

        // calculate score from TestExerciseSolveAttempts existing for this test
        List<TestExerciseSolveAttempt> solveAttempts = this.exerciseSolveAttemptRepository.findByTest(test);

        double score = 0;

        for (TestExerciseSolveAttempt sa : solveAttempts) {
            if (sa.isRight()) {
                score++;
            }
        }

        int scoreInt = (int) Math.ceil((score / solveAttempts.size()) * 100);

        TestResult testResult = TestResult.builder()
                .testId(test.getId())
                .AppUserId(user.getId())
                .score(scoreInt).build();

        this.entityManager.persist(testResult);
        this.entityManager.flush();

        return new ResponseEntity<>(testResult, HttpStatus.OK);
    }

    @GetMapping("/test/{test}/leaderboard")
    public ResponseEntity testLeaderboard() {



        return new ResponseEntity<>(HttpStatus.OK);
    }

}