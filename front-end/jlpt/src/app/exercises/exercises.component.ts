import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

const CONST_EXERCISES = [{id: 1, rate:'positive'}, 
						{id: 2, rate:'positive'},
						{id: 3, rate:'negative'},
						{id: 4, rate:'neutral'},
						{id: 5, rate:'noOpinion'},
						{id: 6, rate:'noOpinion'},
						{id: 7, rate:'noOpinion'},
						{id: 8, rate:'noOpinion'},
						{id: 9, rate:'noOpinion'}];
						

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})

export class ExercisesComponent implements OnInit {
  labelText: string;
  tempArray: any;
  exerciseArray: any;
  indexTemp: any;

  constructor(private httpClient: HttpClient) {};
  exercises_index = CONST_EXERCISES;

  ngOnInit() {
	this.httpClient.get('http://localhost:8080/creator/lesson/'+localStorage.getItem('lessonID')).subscribe(
		(data) => {
			console.log(data);
			this.tempArray = data;
			this.labelText = this.tempArray.name;
			this.exerciseArray = this.tempArray.exercises;
			console.log(this.exerciseArray);
			return data;
		},
		() => {
		}
	  ); 
  }

  /*goExercise(index: string)
  {
	localStorage.setItem('exerciseIndex', index);
  }*/

  goExercise(id: string)
  {
	localStorage.setItem('exerciseID', id);
	localStorage.setItem('dailyExercise', "no");
    console.log(id);
  }


}
