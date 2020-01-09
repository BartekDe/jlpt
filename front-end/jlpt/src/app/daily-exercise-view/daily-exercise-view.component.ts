import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {DailyExerciseAnswerModel} from '../models/DailyExerciseAnswerModel';

@Component({
  selector: 'app-daily-exercise-view',
  templateUrl: './daily-exercise-view.component.html',
  styleUrls: ['./daily-exercise-view.component.css']
})

export class DailyExerciseViewComponent implements OnInit {
  answer: number = 0;
  random: number;
  rightPosition: number;
  tempName: string;
  exerciseType: string;
  imgSrc: string | ArrayBuffer;
  exerciseText: string;
  rightAnswer = [];
  wrongAnswerArray = [];
  answerArray = [];
  labelText: string;
  tempArray: any;
  count: any;
  correctAnswer: boolean;
  interval: any;
  timeNeeded: number= 0;

  constructor(private httpClient: HttpClient,
    private router: Router,
    private authService: AuthService) {};

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
      this.exerciseType = this.tempArray.type;
      this.imgSrc = this.tempArray.contentImage;
      this.exerciseText = this.tempArray.content;
      this.rightAnswer = [{name: this.tempArray.correctAnswer}];
      this.wrongAnswerArray = [{id: 0, name: this.tempArray.answer1}, 
                                {id: 1, name: this.tempArray.answer2},
                                {id: 2, name: this.tempArray.answer3},
                                {id: 3, name: this.tempArray.answer4},
                                {id: 4, name: this.tempArray.answer5}];

      //wylosowanie miejsca poprawnej odpowiedzi
      this.rightPosition = this.getRandomInt(1, 4);
      this.answerArray.push({id: this.rightPosition, name: this.rightAnswer[0].name});

      //dolosowanie błędnych odpowiedzi
      let temp = 0;
      for(let i=1; i<4; i++)
      {
        this.random = this.getRandomInt(0, 4-i+1);
        if(i+temp == this.rightPosition) {temp = 1;}
        this.answerArray.push({id: i+temp, name: this.wrongAnswerArray[this.random].name});
        this.tempName = this.wrongAnswerArray[this.random].name
        let index: number = this.wrongAnswerArray.findIndex(item => item.name === this.tempName);
	      this.wrongAnswerArray.splice(index, 1);
      }
      this.answerArray.sort((a, b) => (a.id > b.id) ? 1 : -1);
      console.log(this.answerArray);
			return data;
		},
		() => {}
    ); 
    this.interval = setInterval(() => {
      this.timeNeeded++;
    },1000)
  }

  sendAnswer()
  {
    if(this.answer === this.rightPosition) this.correctAnswer = true;
    else this.correctAnswer = false;
    const dailyExerciseAnswerModel: DailyExerciseAnswerModel = {
      exerciseId: localStorage.getItem('exerciseID'),
      correct: this.correctAnswer,
      time: this.timeNeeded
    };
    this.authService.sendAnswerDaily(dailyExerciseAnswerModel).subscribe(
      () => {
        console.log(dailyExerciseAnswerModel);
      },
    () => {});
    clearInterval(this.interval);
  }
}
