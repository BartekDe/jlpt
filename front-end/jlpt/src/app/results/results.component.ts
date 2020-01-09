import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  result: number = 0;
  resultArray: any;
  headElements = ['Lp.', 'Nazwa użytkownika', 'Wynik'];

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.httpClient.get('http://localhost:8080/test/leaderboard').subscribe(
      (data) => {
        console.log(data);
        this.resultArray = data;
        return data;
      },
      () => {
      }
    ); 
  }

  chooseResult(resultInput: number)
  {
    this.result = resultInput;
    if(resultInput == 1)
    {
      this.httpClient.get('http://localhost:8080/test/leaderboard').subscribe(
      (data) => {
        console.log(data);
        this.resultArray = data;
        return data;
      },
      () => {
      }
      );
      this.headElements = ['Lp.', 'Nazwa użytkownika', 'Wynik'];
    }
    else if(resultInput == 2)
    {
      /*this.httpClient.get('http://localhost:8080/lesson/leaderboard').subscribe(
      (data) => {
        console.log(data);
        this.resultArray = data;
        return data;
      },
      () => {
      }
      );*/
      this.resultArray = this.elements1;
      this.headElements = ['Lp.', 'Nazwa użytkownika', 'Wynik'];
    }
    else if(resultInput == 3)
    {
      /*this.httpClient.get('http://localhost:8080/daily/leaderboard').subscribe(
      (data) => {
        console.log(data);
        this.resultArray = data;
        return data;
      },
      () => {
      }
      );*/
      this.resultArray = this.elements2;
      this.headElements = ['Lp.', 'Nazwa użytkownika', 'Wynik', 'Czas'];
    }
  }

  elements1: any = [
    {username: 'AdamF', score: 100},
    {username: 'tester', score: 88},
    {username: 'bartekbartek', score: 80},
    {username: 'simon97', score: 75},
    {username: 'user123', score: 60}
  ];

  elements2: any = [
    {username: 'bartekbartek', score: 100, time: 12},
    {username: 'AdamF', score: 100, time: 15},
    {username: 'user123', score: 67, time: 13},
    {username: 'simon97', score: 33, time: 20},
    {username: 'tester', score: 0, time: 7}
    ];
}