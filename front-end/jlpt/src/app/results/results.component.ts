import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  result: number = 0;
  constructor() {}

  ngOnInit() {
  }

  chooseResult(resultInput: number)
  {
	  this.result = resultInput;
  }

  elements: any = [
  {position: 1, name: 'AdamF', result: 100},
  {position: 2, name: 'random_nickname', result: 98},
  {position: 3, name: 'user5', result: 94},
  {position: 4, name: 'Simon97', result: 88},
  {position: 5, name: 'person370', result: 80},
  {position: 6, name: 'user1', result: 80},
  {position: 7, name: 'BD_100', result: 67},
  {position: 8, name: 'user3', result: 60},
  {position: 9, name: 'new_on_site', result: 45},
  {position: 10, name: 'tester', result: 15},
  ];

  headElements = ['Lp.', 'Nazwa użytkownika', 'Wynik'];

}
