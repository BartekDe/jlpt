package pl.jlpt.jlptapi.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DailyExerciseController {

    @GetMapping("/dailies")
    public ResponseEntity getDailyExercises() {

    }

}
