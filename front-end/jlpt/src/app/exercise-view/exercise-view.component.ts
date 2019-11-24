import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exercise-view',
  templateUrl: './exercise-view.component.html',
  styleUrls: ['./exercise-view.component.css']
})
//const opinion = 0;
export class ExerciseViewComponent implements OnInit {
  opinion: number = 0;
  
  makeOpinion(opinionInput: number)
  {
	this.opinion = opinionInput;
  }

  constructor() { }

  ngOnInit() {
  }

}
