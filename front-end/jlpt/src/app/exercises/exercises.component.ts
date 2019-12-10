import { Component, OnInit } from '@angular/core';
const CONST_EXERCISES = [{id: 1, rate:'positive'}, 
						{id: 2, rate:'positive'},
						{id: 3, rate:'negative'},
						{id: 4, rate:'neutral'},
						{id: 5, rate:'noOpinion'},
						{id: 6, rate:'locked'},
						{id: 7, rate:'locked'},
						{id: 8, rate:'locked'},
						{id: 9, rate:'locked'}];
						

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})

export class ExercisesComponent implements OnInit {

  constructor() { }
  exercises_index = CONST_EXERCISES;

  ngOnInit() {
  }

}
