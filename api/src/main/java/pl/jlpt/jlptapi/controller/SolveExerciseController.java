package pl.jlpt.jlptapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import pl.jlpt.jlptapi.dto.request.ExerciseAttemptDto;
import pl.jlpt.jlptapi.dto.response.TestLeaderboardDto;
import pl.jlpt.jlptapi.entity.*;
import pl.jlpt.jlptapi.repository.*;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Comparator;
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
    private TestResultRepository testResultRepository;

    @Autowired
    private TestExerciseSolveAttemptRepository testExerciseSolveAttemptRepository;

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private EntityManager entityManager;

    @PostMapping("/lesson/solve-exercise")
    @Transactional
    public ResponseEntity solveLessonsExercise(@RequestBody ExerciseAttemptDto exerciseAttemptDto, @AuthenticationPrincipal AppUser user) {

        Exercise exercise = this.exerciseRepository.getOne(exerciseAttemptDto.exerciseId);
        Lesson lesson = this.lessonRepository.getOne(exerciseAttemptDto.lessonId);

        LessonExerciseSolveAttempt lessonExerciseSolveAttempt = LessonExerciseSolveAttempt.builder()
                .user(user)
                .exercise(exercise)
                .lesson(lesson)
                .isRight(exerciseAttemptDto.correct)
                .selfEvaluation(exerciseAttemptDto.rate)
                .build();

        this.entityManager.persist(lessonExerciseSolveAttempt);
        this.entityManager.flush();

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/test/solve-exercise")
    @Transactional
    public ResponseEntity solveTestsExercise(@RequestBody ExerciseAttemptDto exerciseAttemptDto, @AuthenticationPrincipal AppUser user) {

        Exercise exercise = this.exerciseRepository.getOne(exerciseAttemptDto.exerciseId);
        Test test = this.testRepository.getOne(exerciseAttemptDto.testId);

        TestExerciseSolveAttempt testExerciseSolveAttempt = TestExerciseSolveAttempt.builder()
                .user(user)
                .exercise(exercise)
                .test(test)
                .isRight(exerciseAttemptDto.correct)
                .build();

        this.entityManager.persist(testExerciseSolveAttempt);
        this.entityManager.flush();

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/test/{test}/finish")
    @Transactional
    public ResponseEntity finishSolvingTest(@PathVariable Test test, @AuthenticationPrincipal AppUser user) {

        // calculate score from TestExerciseSolveAttempts existing for this test
        List<TestExerciseSolveAttempt> solveAttempts = this.testExerciseSolveAttemptRepository.findByTestId(test.getId());

        double score = 0;

        for (TestExerciseSolveAttempt sa : solveAttempts) {
            if (sa.isRight()) {
                score++;
            }
        }

        int scoreInt = (int) Math.ceil((score / solveAttempts.size()) * 100);

        TestResult testResult = TestResult.builder()
                .test(test)
                .user(user)
                .score(scoreInt).build();

        this.entityManager.persist(testResult);
        this.entityManager.flush();

        return new ResponseEntity<>(testResult, HttpStatus.OK);
    }

    @GetMapping("/test/leaderboard")
    public ResponseEntity testLeaderboard() {

        List<TestResult> results = this.testResultRepository.findAll(); // construct dto from this list of objects


        List<TestLeaderboardDto> leaderboard = new ArrayList<>();
        for (TestResult tr : results) {
            AppUser user = this.appUserRepository.findById(tr.getUser().getId()).get();
            Test test = this.testRepository.findById(tr.getTest().getId()).get();
            TestLeaderboardDto data = TestLeaderboardDto.builder().score(tr.getScore())
                    .username(user.getUsername()).build();
            leaderboard.add(data);
        }

        leaderboard.sort((o1, o2) -> o2.score - o1.score);

        return new ResponseEntity<>(leaderboard, HttpStatus.OK);
    }

}