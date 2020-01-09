package pl.jlpt.jlptapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.jlpt.jlptapi.entity.Test;
import pl.jlpt.jlptapi.entity.TestResult;

@Repository
public interface TestResultRepository extends JpaRepository<TestResult, Long> {

}
