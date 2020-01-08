import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import { ExerciseAnswerModel } from '../models/ExerciseAnswerModel';
import { createOfflineCompileUrlResolver } from '@angular/compiler';

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
  //right_answer = [{name: 'とけい'}];
  //wrong_answer_array = CONST_WRONG_ANSWERS;
  /*wrong_answer_array = [{id: 0, name: 'さいふ'}, 
  {id: 1, name: 'ちず'},
  {id: 2, name: 'じしょ'},
  {id: 3, name: 'めがね'},
  {id: 4, name: 'でんわ'}];*/
  exercise_type: string;
  imgSrc: string | ArrayBuffer;
  exercise_text: string;
  right_answer = [];
  wrong_answer_array = [];
  answer_array = [];
  labelText: string;
  tempArray: any;
  count: any;
  correctAnswer: boolean;

  constructor(private httpClient: HttpClient,
    private router: Router,
    private authService: AuthService) {};
  
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

  ngOnInit() {
    this.httpClient.get('http://localhost:8080/creator/exercise/'+localStorage.getItem('exerciseID')).subscribe(
		(data) => {
			console.log(data);
      this.tempArray = data;
      if(this.tempArray.type === "TranslatePol") this.labelText = "Przetłumacz '...' na polski";
      else if(this.tempArray.type === "TranslateHira") this.labelText = "Przetłumacz '...' na hiraganę";
      else if(this.tempArray.type === "TranslateKata") this.labelText = "Przetłumacz '...' na katakanę";
      else if(this.tempArray.type === "TranslateKanji") this.labelText = "Przetłumacz '...' na kanji";
      else if(this.tempArray.type === "FillGap") this.labelText = "Wypełnij lukę";
      else if(this.tempArray.type === "OrderWords") this.labelText = "Podstaw słowo w miejsce '*'";
      else if(this.tempArray.type === "FillGapText") this.labelText = "Wypełnij lukę";
      else if(this.tempArray.type === "ReadingCompText") this.labelText = "Odpowiedz na podstawie tekstu";
      else if(this.tempArray.type === "ReadingCompTextPict") this.labelText = "Odpowiedz na podstawie zdjęcia i tekstu";
      else if(this.tempArray.type === "WriteInOtherWords") this.labelText = "Napisz innymi słowami";
      else if(this.tempArray.type === "DescribePict") this.labelText = "Wskaż co przedstawia zdjęcie";
      this.exercise_type = this.tempArray.type;
      this.imgSrc = this.tempArray.contentImage;
      this.exercise_text = this.tempArray.content;
      this.right_answer = [{name: this.tempArray.correctAnswer}];
      this.wrong_answer_array = [{id: 0, name: this.tempArray.answer1}, 
                                {id: 1, name: this.tempArray.answer2},
                                {id: 2, name: this.tempArray.answer3},
                                {id: 3, name: this.tempArray.answer4},
                                {id: 4, name: this.tempArray.answer5}];

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
			return data;
		},
		() => {}
    ); 

  }

  /*nextExercise()
  {
    this.count = localStorage.getItem('exerciseIndex');
    this.count+= 1;
    localStorage.setItem('exerciseIndex', this.count);
    this.router.navigate(['/exercise-view']);
  }*/

  sendAnswer()
  {
    if(this.answer === this.rightPosition) this.correctAnswer = true;
    else this.correctAnswer = false;
    const exerciseAnswerModel: ExerciseAnswerModel = {
      exerciseId: localStorage.getItem('exerciseID'),
      lessonId: localStorage.getItem('lessonID'),
      correct: this.correctAnswer,
      rate: this.opinion.toString()
    };
    this.authService.sendAnswer(exerciseAnswerModel).subscribe(
    () => {
      console.log(exerciseAnswerModel);
    },
    () => { console.log('DUPA'); console.log(exerciseAnswerModel); });
  }

}
