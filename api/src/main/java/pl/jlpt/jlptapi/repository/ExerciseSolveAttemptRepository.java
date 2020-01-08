package pl.jlpt.jlptapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.jlpt.jlptapi.entity.*;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExerciseSolveAttemptRepository extends JpaRepository<TestExerciseSolveAttempt, Long> {

    List<TestExerciseSolveAttempt> findByTest(Test test);
}
