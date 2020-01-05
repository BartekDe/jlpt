import { Component, OnInit } from '@angular/core';
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

  constructor() { }
  lessons_index = CONST_LESSONS;

  ngOnInit() {
  }

  goTheory(napis: string)
  {
	localStorage.setItem('name', napis);
  }

}
