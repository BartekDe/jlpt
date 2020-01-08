import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

const CONST_LESSONS = [{id: 1, name: 'Hiragana', rateT:'v', rateE:'v'}, 
						{id: 2, name: 'Katakana', rateT:'v', rateE:'v'},
						{id: 3, name: 'Kanji', rateT:'v', rateE:'x'},
						{id: 4, name: 'Pozdrowienia i zwroty grzecznościowe', rateT:'none', rateE:'none'},
						{id: 5, name: 'Liczebniki', rateT:'none', rateE:'none'},
						{id: 6, name: 'Dni tygodnia', rateT:'none', rateE:'none'},
						{id: 7, name: 'Dni miesiąca', rateT:'none', rateE:'none'},
						{id: 8, name: 'Miesiące', rateT:'none', rateE:'none'},
						{id: 9, name: 'Pytanie o wiek', rateT:'none', rateE:'none'}];


@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {
  lesson_list: any;

  constructor(private httpClient: HttpClient,
    private router: Router) {};
  lessons_index = CONST_LESSONS;
  

  ngOnInit() {
    this.httpClient.get('http://localhost:8080/creator/lesson/all').subscribe(
      (data) => {
      console.log(data);
      this.lesson_list = data;
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
