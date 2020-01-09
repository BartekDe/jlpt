import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {
  testList: any;
  madeExercisesArray = [];
  madeExercisesIndexArray = [];

  constructor(private httpClient: HttpClient,
    private router: Router) {};

  ngOnInit() {
    this.httpClient.get('http://localhost:8080/tests').subscribe(
      (data) => {
      console.log(data);
      this.testList = data;
		  return data;
      },
	  () => {
	  }
    ); 
  }

  goElsewhere(id: string)
  {
    localStorage.setItem('testID', id);
    localStorage.setItem('exercises', JSON.stringify(this.madeExercisesArray));
    localStorage.setItem('chooseExerciseIndex', JSON.stringify(this.madeExercisesIndexArray));
  }

  giveTime(time: string)
  {
    localStorage.setItem('time', time);
    localStorage.removeItem('timeLeft');
    localStorage.setItem('timeLeft', (+time*60).toString());
  }

}