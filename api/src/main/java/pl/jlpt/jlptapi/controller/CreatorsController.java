package pl.jlpt.jlptapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.jlpt.jlptapi.dto.request.creator.ExerciseCreatorDto;
import pl.jlpt.jlptapi.entity.Exercise;
import pl.jlpt.jlptapi.repository.ExerciseRepository;
import pl.jlpt.jlptapi.security.CustomUserDetailsService;
import pl.jlpt.jlptapi.service.creator.ExerciseCreatorService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/creator")
public class CreatorsController {

    @Autowired
    ExerciseCreatorService exerciseCreatorService;

    @Autowired
    ExerciseRepository exerciseRepository;

    @Autowired
    CustomUserDetailsService detailsService;

    @PostMapping("/exercise")
    public ResponseEntity createExercise(@Valid @RequestBody ExerciseCreatorDto exerciseCreatorDto) {

        exerciseCreatorService.createExercise(exerciseCreatorDto);

        return new ResponseEntity(HttpStatus.OK);
    }

    @PutMapping("/exercise/{exercise}")
    public ResponseEntity editExercise(
            @Valid @RequestBody ExerciseCreatorDto exerciseCreatorDto,
            @PathVariable Exercise exercise
    ) {

        exerciseCreatorService.editExercise(exercise, exerciseCreatorDto);

        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/exercise/all")
    public ResponseEntity listAllExercises() {
        List exercises = this.exerciseRepository.findAll();

        return new ResponseEntity(exercises, HttpStatus.OK);
    }

}
