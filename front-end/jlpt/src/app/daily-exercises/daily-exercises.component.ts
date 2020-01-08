import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';						

@Component({
  selector: 'app-daily-exercises',
  templateUrl: './daily-exercises.component.html',
  styleUrls: ['./daily-exercises.component.css']
})

export class DailyExercisesComponent implements OnInit {
  tempArray: any;
  dailyExerciseArray: any;

  constructor(private httpClient: HttpClient) {};

  ngOnInit() {
	this.httpClient.get('http://localhost:8080/creator/lesson/'+localStorage.getItem('lessonID')).subscribe(
		(data) => {
			console.log(data);
			this.tempArray = data;
			this.dailyExerciseArray = this.tempArray.exercises;
			console.log(this.dailyExerciseArray);
			return data;
		},
		() => {
		}
	  ); 
  }

  goExercise(id: string)
  {
	localStorage.setItem('exerciseID', id);
	localStorage.setItem('dailyExercise', "yes");
    console.log(id);
  }


}
