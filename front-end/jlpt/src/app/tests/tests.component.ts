import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
const CONST_TESTS = [{id: 1, name: 'Słownictwo 1', time: 25, rateT:'v', rateE:'v'}, 
						{id: 2, name: 'Gramatyka 1', time: 20, rateT:'v', rateE:'v'},
						{id: 3, name: 'Czytanie 1', time: 30, rateT:'v', rateE:'x'}];
=======
>>>>>>> master

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {

<<<<<<< HEAD
  constructor() {}
  test_index = CONST_TESTS;
=======
  constructor() { }
>>>>>>> master

  ngOnInit() {
  }

<<<<<<< HEAD
}
=======
}
>>>>>>> master
