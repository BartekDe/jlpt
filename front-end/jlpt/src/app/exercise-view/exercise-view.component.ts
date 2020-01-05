import { Component, OnInit } from '@angular/core';

const CONST_RIGHT_ANSWER = [{name: 'とけい'}];
const CONST_WRONG_ANSWERS = [{id: 0, name: 'さいふ'}, 
						{id: 1, name: 'ちず'},
						{id: 2, name: 'じしょ'},
						{id: 3, name: 'めがね'},
						{id: 4, name: 'でんわ'}];


@Component({
  selector: 'app-exercise-view',
  templateUrl: './exercise-view.component.html',
  styleUrls: ['./exercise-view.component.css']
})
//const opinion = 0;
export class ExerciseViewComponent implements OnInit {
  opinion: number = 0;
  answer: number = 0;
  random: number;
  rightPosition: number;
  tempName: string;
  //right_answer = CONST_RIGHT_ANSWER;
  right_answer = [{name: 'とけい'}];
  //wrong_answer_array = CONST_WRONG_ANSWERS;
  wrong_answer_array = [{id: 0, name: 'さいふ'}, 
  {id: 1, name: 'ちず'},
  {id: 2, name: 'じしょ'},
  {id: 3, name: 'めがね'},
  {id: 4, name: 'でんわ'}];
  answer_array = [];
  
  makeOpinion(opinionInput: number)
  {
	  this.opinion = opinionInput;
  }

  takeAnswer(answerInput: number)
  {
	  this.answer = answerInput;
  }

  getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  constructor() { }

  ngOnInit() {
    //wylosowanie miejsca poprawnej odpowiedzi
    this.rightPosition = this.getRandomInt(1, 4);
    this.answer_array.push({id: this.rightPosition, name: this.right_answer[0].name});

    //dolosowanie błędnych odpowiedzi
    let temp = 0;
    for(let i=1; i<4; i++)
    {
      this.random = this.getRandomInt(0, 4-i+1);
      if(i+temp == this.rightPosition) {temp = 1;}
      this.answer_array.push({id: i+temp, name: this.wrong_answer_array[this.random].name});
      this.tempName = this.wrong_answer_array[this.random].name
      let index: number = this.wrong_answer_array.findIndex(item => item.name === this.tempName);
	    this.wrong_answer_array.splice(index, 1);
    }
    this.answer_array.sort((a, b) => (a.id > b.id) ? 1 : -1);
    console.log(this.answer_array);
  }

}
