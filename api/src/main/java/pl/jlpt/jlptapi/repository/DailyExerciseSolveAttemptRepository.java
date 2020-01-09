package pl.jlpt.jlptapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.jlpt.jlptapi.entity.DailyExerciseSolveAttempt;
import pl.jlpt.jlptapi.entity.TestExerciseSolveAttempt;

import java.sql.Date;
import java.util.List;

@Repository
public interface DailyExerciseSolveAttemptRepository extends JpaRepository<DailyExerciseSolveAttempt, Long> {

    List<DailyExerciseSolveAttempt> findByExerciseSetDate(Date date);
}
