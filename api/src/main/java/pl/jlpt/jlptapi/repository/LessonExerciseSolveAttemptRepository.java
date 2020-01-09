package pl.jlpt.jlptapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.jlpt.jlptapi.entity.AppUser;
import pl.jlpt.jlptapi.entity.LessonExerciseSolveAttempt;
import pl.jlpt.jlptapi.entity.Lesson;

import java.util.List;

@Repository
public interface LessonExerciseSolveAttemptRepository extends JpaRepository<LessonExerciseSolveAttempt, Long> {

    List<LessonExerciseSolveAttempt> findByLesson(Lesson lesson);

    List<LessonExerciseSolveAttempt> findByUser(AppUser appUser);
}
