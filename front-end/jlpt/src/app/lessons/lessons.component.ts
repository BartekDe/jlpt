import { Component, OnInit } from '@angular/core';
const CONST_LESSONS = [{id: 1, rateT:'v', rateE:'v'}, 
						{id: 2, rateT:'v', rateE:'v'},
						{id: 3, rateT:'v', rateE:'x'},
						{id: 4, rateT:'none', rateE:'none'},
						{id: 5, rateT:'none', rateE:'none'},
						{id: 6, rateT:'none', rateE:'none'},
						{id: 7, rateT:'none', rateE:'none'},
						{id: 8, rateT:'none', rateE:'none'},
						{id: 9, rateT:'none', rateE:'none'}];


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

}
