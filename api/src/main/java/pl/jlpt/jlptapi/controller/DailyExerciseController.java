package pl.jlpt.jlptapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.jlpt.jlptapi.entity.DailyExerciseSet;
import pl.jlpt.jlptapi.entity.Exercise;
import pl.jlpt.jlptapi.repository.DailyExerciseSetRepository;
import pl.jlpt.jlptapi.repository.ExerciseRepository;

import javax.persistence.EntityManager;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@RestController
public class DailyExerciseController {

    @Autowired
    private ExerciseRepository exerciseRepository;

    @Autowired
    private DailyExerciseSetRepository dailyExerciseSetRepository;

    @Autowired
    private EntityManager entityManager;

    @GetMapping("/dailies")
    public ResponseEntity getDailyExercises() {

        // pobierz z bazy dla dzisiejszej daty
        // jesli nie ma to generuj, jesli jest to zwroc
        Date today = new Date((new java.util.Date()).getTime());

        Optional<DailyExerciseSet> todayExercises = this.dailyExerciseSetRepository.findByDate(today);


        if (todayExercises.isPresent()) { // wylosowano juz dzisiejsze zadania
            System.out.println("+++++++WYLOSOWANO JUZ DZISIAJ zadania - zwracanie istniejacych");
            return new ResponseEntity<>(todayExercises.get(), HttpStatus.OK);
        }

        DailyExerciseSet dailyExerciseSet = new DailyExerciseSet();
        dailyExerciseSet.setDate(today);

        List<Exercise> chosenExercises = new ArrayList<>();

        List<Exercise> exercises = this.exerciseRepository.findAll();
        for (int i = 0; i < 3; i++) {
            int id = (int) Math.ceil(Math.random() * exercises.size());
            chosenExercises.add(exercises.get(id));
        }

        dailyExerciseSet.setExercises(chosenExercises);
        this.entityManager.persist(dailyExerciseSet);
        this.entityManager.flush();

        System.out.println("+++++++WYLOSOWANO nowe zadania dnia");
        return new ResponseEntity<>(chosenExercises, HttpStatus.OK);
    }

}
