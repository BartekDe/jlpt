import { Component} from '@angular/core';
import {FormBuilder, NgForm, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';

const CONST_EXERCISES_CHOSE = [{id: 1, name:'Ćwiczenie 1', type: 1}, 
						{id: 2, name:'Ćwiczenie 2', type: 1},
						{id: 3, name:'Ćwiczenie 3', type: 2},
						{id: 4, name:'Ćwiczenie 4', type: 3},
						{id: 5, name:'Ćwiczenie 5', type: 4},
						{id: 6, name:'Ćwiczenie 6', type: 4},
						{id: 7, name:'Ćwiczenie 7', type: 4},
						{id: 8, name:'Ćwiczenie 8', type: 5},
						{id: 9, name:'Ćwiczenie 9', type: 6},
						{id: 10, name:'Ćwiczenie 10', type: 7},
						{id: 11, name:'Ćwiczenie 11', type: 8},
						{id: 12, name:'Ćwiczenie 12', type: 9},
						{id: 13, name:'Ćwiczenie 13', type: 9},
						{id: 14, name:'Ćwiczenie 14', type: 10},
						{id: 15, name:'Ćwiczenie 15', type: 11}];
						
const CONST_TYPE_CHOSE = [{id: 1, name:'Przetłumacz ... na polski'}, 
						{id: 2, name:'Przetłumacz ... na hiragane'},
						{id: 3, name:'Przetłumacz ... na katakane'},
						{id: 4, name:'Przetłumacz ... na kanji'},
						{id: 5, name:'Wstaw odpowiednie słowo w ...'},
						{id: 6, name:'Uszereguj zdanie, wskaż które słowo znajdzie się w miejscu z *'},
						{id: 7, name:'Wstaw odpowiednie słowo w ... w dłuższym tekście'},
						{id: 8, name:'Czytanie ze zrozumieniem, odpowiedz na podstawie tekstu'},
						{id: 9, name:'Czytanie ze zrozumieniem i zdjęciem, odpowiedz na podstawie tekstu i zdjęcia'},
						{id: 10, name:'Napisz innymi słowami'},
						{id: 11, name:'Wskaż co przedstawia zdjęcie'}];

@Component({
  selector: 'app-test-wizard',
  templateUrl: './test-wizard.component.html',
  styleUrls: ['./test-wizard.component.css']
})
export class TestWizardComponent{
  testForm: any;
  pdfSrc: string | ArrayBuffer = "";
  totalPages: string;
  currentPage: number = 1;
  numberOfPages: number;
  scale: number = 0.5;
  pdf: PDFDocumentProxy;
  currentType: number = 0;
  currentTypeName: string = '';

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService) {
    this.testForm = this.formBuilder.group({
      testName: ['', Validators.required]     
    });
  }
  
  exercises_index = CONST_EXERCISES_CHOSE;
  type_index = CONST_TYPE_CHOSE;
  chosen_exercises_index = [];
  chosen_type_index = [];
  
  addExercise(exercise_name: string)
  {
	let data = this.chosen_exercises_index.find(ob => ob['name'] === exercise_name);
	if(data === undefined)
	{
		this.chosen_exercises_index.push({id: 1, name: exercise_name});
	}
  }
  
  addType(type_id: number)
  {
	this.currentType = type_id;
	let data = this.chosen_type_index.find(ob => ob['id'] === type_id);
	if(data === undefined)
	{
		this.chosen_type_index.push({id: type_id});
	}
  }
  
  addTypeName(type_name: string)
  {
	this.currentTypeName = type_name;
  }
  
  deleteExercise(exercise_name: string)
  {
	let index: number = this.chosen_exercises_index.findIndex(item => item.name === exercise_name);
	this.chosen_exercises_index.splice(index, 1);
  }

  reset(form: NgForm) {
	this.currentType=0;
	this.currentTypeName='';
    form.reset();
	this.chosen_exercises_index.length=0;
  }

}
