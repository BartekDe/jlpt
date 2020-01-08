import { Component, OnInit } from '@angular/core';
import {FormBuilder, NgForm, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../auth.service';
import {TestModel} from '../models/TestModel';

						
const CONST_TYPE_CHOSE = [{id: "TranslatePol", name:'Przetłumacz na polski'}, 
						{id: "TranslateHira", name:'Przetłumacz na hiragane'},
						{id: "TranslateKata", name:'Przetłumacz na katakane'},
						{id: "TranslateKanji", name:'Przetłumacz na kanji'},
						{id: "FillGap", name:'Wstaw odpowiednie słowo w lukę'},
						{id: "OrderWords", name:'Uszereguj zdanie, wskaż które słowo znajdzie się w miejscu z *'},
						{id: "FillGapText", name:'Wstaw odpowiednie słowo w lukę w dłuższym tekście'},
						{id: "ReadingCompText", name:'Czytanie ze zrozumieniem, odpowiedz na podstawie tekstu'},
						{id: "ReadingCompTextPict", name:'Czytanie ze zrozumieniem i zdjęciem, odpowiedz na podstawie tekstu i zdjęcia'},
						{id: "WriteInOtherWords", name:'Napisz innymi słowami'},
						{id: "DescribePict", name:'Wskaż co przedstawia zdjęcie'}];

@Component({
  selector: 'app-test-wizard',
  templateUrl: './test-wizard.component.html',
  styleUrls: ['./test-wizard.component.css']
})
export class TestWizardComponent implements OnInit{
  testForm: any;
  currentTypeName: string = '';
  exercise_list: any;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
			  private httpClient: HttpClient) {
    this.testForm = this.formBuilder.group({
	  testName: ['', Validators.required],
	  testDuration: ['', Validators.required]     
    });
  }
  type_index = CONST_TYPE_CHOSE;
  chosen_exercises_index = [];
  chosen_type_index = [];
  temp_array = [];
  
  ngOnInit(){
  this.httpClient.get('http://localhost:8080/creator/exercise/all?type=TranslatePol').subscribe(
      (data) => {
		  console.log(data);
		  this.exercise_list = data;
		  this.currentTypeName = "Przetłumacz ... na polski";
		  return data;
      },
	  () => {}
    ); 
	  
  }
  
  addExercise(exercise: any)
  {
	let data = this.chosen_exercises_index.find(ob => ob['id'] === exercise.id);
	if(data === undefined)
	{
		this.chosen_exercises_index.push({id: exercise.id, name: exercise.name});
	}
  }
  
  addType(type_id: number)
  {
	let data = this.chosen_type_index.find(ob => ob['id'] === type_id);
	if(data === undefined)
	{
		this.chosen_type_index.push({id: type_id});
	}
	this.httpClient.get('http://localhost:8080/creator/exercise/all?type='+type_id).subscribe(
		(data) => {
			console.log(data);
			this.exercise_list = data;
			return data;
		},
		() => {}
	  ); 
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
    form.reset();
	this.chosen_exercises_index.length=0;
	this.httpClient.get('http://localhost:8080/creator/exercise/all?type=TranslatePol').subscribe(
      (data) => {
		  console.log(data);
		  this.exercise_list = data;
		  this.currentTypeName = "Przetłumacz ... na polski";
		  return data;
      },
	  () => {}
    ); 
  }
  
  create() {
	for(var i=0; i < this.chosen_exercises_index.length; i++)
    {
	  this.temp_array[i]=this.chosen_exercises_index[i].id;
    }
    const testModel: TestModel = {
	  name: this.testForm.value.testName,
	  duration: this.testForm.value.testDuration,
	  exerciseIds: this.temp_array,
	};
	console.log(testModel);
    this.authService.createTest(testModel).subscribe (
      () => { alert('TEST ZOSTAŁ POPRAWNIE UTWORZONY I ZAPISANY'); },
	  () => { alert('WYSTĄPIŁ PROBLEM Z UTWORZENIEM TESTU, SPRAWDŹ SWOJE UPRAWNIENIA'); }
    );
  }
  
}
