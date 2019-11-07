package pl.jlpt.jlptapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.jlpt.jlptapi.dto.request.creator.ExerciseCreatorDto;
import pl.jlpt.jlptapi.service.creator.ExerciseCreatorService;

import javax.validation.Valid;

@RestController
@RequestMapping("/creator")
public class CreatorsController {

    @Autowired
    ExerciseCreatorService exerciseCreatorService;

    @PostMapping("/exercise")
    public ResponseEntity exerciseCreator(@Valid @RequestBody ExerciseCreatorDto exerciseCreatorDto) {

        exerciseCreatorService.createExercise(exerciseCreatorDto);

        return new ResponseEntity(HttpStatus.OK);
    }

}
