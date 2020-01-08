package pl.jlpt.jlptapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pl.jlpt.jlptapi.dto.request.creator.TestCreatorDto;
import pl.jlpt.jlptapi.entity.Exercise;
import pl.jlpt.jlptapi.entity.Test;
import pl.jlpt.jlptapi.repository.ExerciseRepository;
import pl.jlpt.jlptapi.repository.TestRepository;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;

@RestController
public class TestController {

    @Autowired
    private ExerciseRepository exerciseRepository;

    @Autowired
    private TestRepository testRepository;

    @Autowired
    private EntityManager entityManager;

    @PostMapping("/test")
    @Transactional
    public ResponseEntity createTest(@RequestBody TestCreatorDto testCreatorDto) {

        List<Exercise> exercises = this.exerciseRepository.findAllById(testCreatorDto.getExerciseIds());
        Test test = Test.builder()
                .exercises(exercises)
                .name(testCreatorDto.getName())
                .timeLimit(testCreatorDto.getTimeLimit())
                .build();

        this.entityManager.persist(test);
        this.entityManager.flush();

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/tests")
    public ResponseEntity getAllTests() {

        List<Test> tests = this.testRepository.findAll(
                Sort.by("id").ascending()
        );
        tests.add(Test.builder().id(1L).name("dupa").build());
        return ResponseEntity.ok(tests);
    }

}
