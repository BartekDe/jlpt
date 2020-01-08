package pl.jlpt.jlptapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.jlpt.jlptapi.entity.DailyExerciseSet;

import java.sql.Date;
import java.util.Optional;

@Repository
public interface DailyExerciseSetRepository extends JpaRepository<DailyExerciseSet, Long> {

    Optional<DailyExerciseSet> findByDate(Date date);
}
