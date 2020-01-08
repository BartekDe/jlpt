package pl.jlpt.jlptapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pl.jlpt.jlptapi.dto.request.creator.TestCreatorDto;
import pl.jlpt.jlptapi.entity.Exercise;
import pl.jlpt.jlptapi.entity.Test;
import pl.jlpt.jlptapi.repository.ExerciseRepository;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@RestController
public class TestController {

    @Autowired
    private ExerciseRepository exerciseRepository;

    @Autowired
    private EntityManager entityManager;

    @PostMapping("/test")
    @Transactional
    public ResponseEntity createTest(@RequestBody TestCreatorDto testCreatorDto) {
        List<Exercise> exercises = this.exerciseRepository.findAllById(testCreatorDto.getExerciseIds());
        Test test = Test.builder().exercises(exercises)
                .name(testCreatorDto.getName())
                .timeLimit(testCreatorDto.getTimeLimit())
                .build();

        this.entityManager.persist(test);
        this.entityManager.flush();

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
