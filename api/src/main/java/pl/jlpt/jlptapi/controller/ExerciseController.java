package pl.jlpt.jlptapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import pl.jlpt.jlptapi.dto.request.creator.ExerciseCreatorDto;
import pl.jlpt.jlptapi.dto.response.ExerciseDto;
import pl.jlpt.jlptapi.entity.Exercise;
import pl.jlpt.jlptapi.security.CustomUserDetailsService;
import pl.jlpt.jlptapi.service.creator.ExerciseCreatorService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/creator")
public class ExerciseController {

    @Autowired
    ExerciseCreatorService exerciseCreatorService;

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
        if (exercise == null) {
            throw new HttpClientErrorException(HttpStatus.NOT_FOUND, "Exercise not found");
        } else {
            exerciseCreatorService.editExercise(exercise, exerciseCreatorDto);

            return new ResponseEntity(HttpStatus.OK);
        }
    }

    @GetMapping("/exercise/all")
    public ResponseEntity listAllExercises() {

        List<ExerciseDto> exercises = exerciseCreatorService.getExerciseList();

        return new ResponseEntity(exercises, HttpStatus.OK);
    }

    @GetMapping("/exercise/{exercise}")
    public ResponseEntity getSingleExercise(@PathVariable Exercise exercise) {
        if (exercise == null) {
            throw new HttpClientErrorException(HttpStatus.NOT_FOUND, "Exercise not found");
        } else {
            return new ResponseEntity(exercise, HttpStatus.OK);
        }
    }

}