import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {
  lessonList: any;
  exerciseList = [];
  doneExercisesArray = [];
  doneTheoryArray = [];

  constructor(private httpClient: HttpClient,
    private router: Router) {};

  ngOnInit() {
    this.httpClient.get('http://localhost:8080/creator/lesson/all').subscribe(
      (data) => {
      console.log(data);
      this.lessonList = data;
      for(let i=0; i<this.lessonList.length; i++)
      {
        if(this.lessonList[i].name !== 'Hiragana' && this.lessonList[i].name !== 'Katakana' && this.lessonList[i].name !== 'Kanji')
        {
          let exerciseList = this.lessonList[i].exercises;
          if(exerciseList.map(function(e) { return e.rate; }).every(function (el) {return el !== null;}))
          {
            this.doneExercisesArray[i] = "done";
          }
          else if(exerciseList.map(function(e) { return e.rate; }).every(function (el) {return el === null;}))
          {
            this.doneExercisesArray[i] = "none";
          }
          else if(exerciseList.map(function(e) { return e.rate; }).some(function (el) {return el === null;}))
          {
            this.doneExercisesArray[i] = "notDone";
          }
        }
        else
        {
          if(this.lessonList[i].successCount > 100) this.doneExercisesArray[i] = "done";
          else this.doneExercisesArray[i] = "none";
        }
        
        if(this.lessonList[i].isTheorySeen === true) this.doneTheoryArray[i] = "done";
        else if(this.lessonList[i].isTheorySeen === null) this.doneTheoryArray[i] = "none";
      }
		  return data;
      },
	  () => {
	  }
    ); 
  }

  goElsewhere(id: string)
  {
    localStorage.setItem('lessonID', id);
  }

  checkExercise(name: string)
  {
    if(name === "Hiragana") this.router.navigate(['/exercises-hiragana']);
    else if(name === "Katakana") this.router.navigate(['/exercises-katakana']);
    else if(name === "Kanji") this.router.navigate(['/exercises-kanji']);
    else this.router.navigate(['/exercises']);
  }
}