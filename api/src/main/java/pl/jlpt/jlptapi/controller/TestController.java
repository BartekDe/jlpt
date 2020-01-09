package pl.jlpt.jlptapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.jlpt.jlptapi.dto.request.creator.TestCreatorDto;
import pl.jlpt.jlptapi.entity.Exercise;
import pl.jlpt.jlptapi.entity.Test;
import pl.jlpt.jlptapi.repository.ExerciseRepository;
import pl.jlpt.jlptapi.repository.TestRepository;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController("/creator")
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

        Map exIds = new HashMap<Integer, Long>();
        for (int i = 0; i < tests.size(); ++i) {
            exIds.put(i, tests.get(i).getId());
        }

        return new ResponseEntity<>(tests, HttpStatus.OK);
    }

    @GetMapping("/tests/{test}")
    public ResponseEntity getTest(@PathVariable Test test) {

        return ResponseEntity.ok(test);
    }

}
