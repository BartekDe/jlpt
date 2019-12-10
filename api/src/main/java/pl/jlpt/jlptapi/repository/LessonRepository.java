package pl.jlpt.jlptapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.jlpt.jlptapi.entity.Lesson;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, Long> {

}
