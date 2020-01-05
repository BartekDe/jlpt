import { Component, OnInit } from '@angular/core';
const CONST_EXERCISES = [{id: 1}, 
						{id: 2},
						{id: 3},
						{id: 4},
						{id: 5},
						{id: 6},
						{id: 7},
						{id: 8},
						{id: 9}];
						

@Component({
  selector: 'app-test-exercises',
  templateUrl: './test-exercises.component.html',
  styleUrls: ['./test-exercises.component.css']
})

export class TestExercisesComponent implements OnInit {

  constructor() { }
  exercises_index = CONST_EXERCISES;

  ngOnInit() {
  }

}
