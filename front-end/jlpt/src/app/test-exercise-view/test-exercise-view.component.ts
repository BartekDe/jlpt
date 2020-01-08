import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-exercise-view',
  templateUrl: './test-exercise-view.component.html',
  styleUrls: ['./test-exercise-view.component.css']
})
//const opinion = 0;
export class TestExerciseViewComponent implements OnInit {
  opinion: number = 0;
  answer: number = 0;
  
  makeOpinion(opinionInput: number)
  {
	  this.opinion = opinionInput;
  }

  takeAnswer(answerInput: number)
  {
	  this.answer = answerInput;
  }

  constructor() { }

  ngOnInit() {
  }

}
