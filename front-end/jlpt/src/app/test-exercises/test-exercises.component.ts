import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';						
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-test-exercises',
  templateUrl: './test-exercises.component.html',
  styleUrls: ['./test-exercises.component.css']
})

export class TestExercisesComponent implements OnInit {
  tempArray: any;
  labelText: any;
  exerciseArray = [];
  interval: any;
  timeLeft: number;
  timeStart: number;
  timeVisible: string;
  timeVisibleSeconds: string = '';
  timeVisibleMinutes: string = '';
  timeVisibleHours: string = '';
  madeExercisesArray = [];
  block: number;
  madeExercisesIndexArray = [];
  resultArray: any;
  result: string;

  constructor(private httpClient: HttpClient,
	private router: Router,
	private authService: AuthService) {};

  ngOnInit() {
	this.madeExercisesIndexArray = JSON.parse(localStorage.getItem('chooseExerciseIndex'));
	this.httpClient.get('http://localhost:8080/tests/'+localStorage.getItem('testID')).subscribe(
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
	this.timeStart = (+ localStorage.getItem('time')) * 60;
	if(localStorage.getItem('timeLeft') !== '') this.timeLeft = + localStorage.getItem('timeLeft');
	else this.timeLeft = this.timeStart;
	this.interval = setInterval(() => {
		if(this.timeLeft > 0) {
		  this.timeLeft--;
		  localStorage.setItem('timeLeft', this.timeLeft.toString());
		} else {
		  clearInterval(this.interval);
		  localStorage.removeItem('timeLeft');
		  localStorage.setItem('timeLeft', '');
		  alert('KONIEC CZASU');
		  setTimeout(() => {
			this.router.navigate(['/tests']);
		  }, 5000);
		}
		this.convertTime(this.timeLeft);
	},1000)
  }

  goExercise(id: string)
  {
	localStorage.setItem('exerciseID', id);
	localStorage.setItem('dailyExercise', "no");
    console.log(id);
  }

  chooseIndex(index: number)
  {
	this.madeExercisesIndexArray.push(index.toString());
	localStorage.setItem('chooseExerciseIndex', JSON.stringify(this.madeExercisesIndexArray));
  }

  submitTest()
  {
	localStorage.removeItem('exercises');
	localStorage.removeItem('timeLeft');
	this.authService.finishTest(localStorage.getItem('testID')).subscribe(
		(data) => {
			console.log(data);
			this.resultArray = data;
			this.result = this.resultArray.score.toString();
		},
		() => {
		}
	);
	alert('ZAKOŃCZONO TEST\nWYNIK: ' + this.result + '%');
	setTimeout(() => {
		this.router.navigate(['/tests']);
	}, 5000);
  }

  convertTime(time: number)
  {
	  if(time > 3600) 
	  {
		this.timeVisibleHours = ((time - (time % 3600)) / 3600).toString();
		time = time % 3600;
		if((time - (time % 60)) < 10) this.timeVisibleMinutes = "0" + ((time - (time % 60)) / 60).toString();
		else this.timeVisibleMinutes = ((time - (time % 60)) / 60).toString();
		time = time % 60;
		if(time < 10) this.timeVisibleSeconds = "0" + time.toString();
		else this.timeVisibleSeconds = time.toString();
	  }
	  else if(time > 60)
	  {
		this.timeVisibleMinutes = ((time - (time % 60)) / 60).toString();
		time = time % 60;
		if(time < 10) this.timeVisibleSeconds = "0" + time.toString();
		else this.timeVisibleSeconds = time.toString();
	  }
	  else
	  {
		this.timeVisibleSeconds = time.toString();
	  }
	  if(this.timeVisibleHours !== '')
	  {
		this.timeVisible = this.timeVisibleHours = ":" + this.timeVisibleMinutes + ":" + this.timeVisibleSeconds;
	  }
	  else if(this.timeVisibleMinutes !== '')
	  {
		this.timeVisible = this.timeVisibleMinutes + ":" + this.timeVisibleSeconds;
	  }
	  else this.timeVisible = this.timeVisibleSeconds;
  }
}
