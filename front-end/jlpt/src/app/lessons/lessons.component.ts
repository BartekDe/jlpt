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

  constructor(private httpClient: HttpClient,
    private router: Router) {};

  ngOnInit() {
    this.httpClient.get('http://localhost:8080/creator/lesson/all').subscribe(
      (data) => {
      console.log(data);
      this.lessonList = data;
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