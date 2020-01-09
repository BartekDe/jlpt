package pl.jlpt.jlptapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.jlpt.jlptapi.entity.Lesson;
import pl.jlpt.jlptapi.entity.TestExerciseSolveAttempt;
import pl.jlpt.jlptapi.entity.TestResult;
import pl.jlpt.jlptapi.entity.TheoryOnLesson;

import java.util.List;

@Repository
public interface TheoryOnLessonRepository extends JpaRepository<TheoryOnLesson, Long> {

    List<TheoryOnLesson> findByLesson(Lesson lesson);

}
