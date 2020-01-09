import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
						
@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})

export class ExercisesComponent implements OnInit {
  labelText: string;
  tempArray: any;
  exerciseArray = [];
  indexTemp: any;

  constructor(private httpClient: HttpClient) {};

  ngOnInit() {
	this.httpClient.get('http://localhost:8080/creator/lesson/'+localStorage.getItem('lessonID')).subscribe(
		(data) => {
			console.log(data);
			this.tempArray = data;
			this.labelText = this.tempArray.name;
			this.exerciseArray = this.tempArray.exercises;
			return data;
		},
		() => {
		}
	  ); 
  }

  goExercise(id: string)
  {
	localStorage.setItem('exerciseID', id);
  }

}
