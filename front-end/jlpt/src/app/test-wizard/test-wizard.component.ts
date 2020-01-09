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
  exerciseList: any;
  typeIndex = CONST_TYPE_CHOSE;
  chosenExercisesIndex = [];
  chosenTypeIndex = [];
  tempArray = [];

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
			  private httpClient: HttpClient) {
    this.testForm = this.formBuilder.group({
	  testName: ['', Validators.required],
	  testDuration: ['', Validators.required]     
    });
  }
  
  ngOnInit(){
  this.httpClient.get('http://localhost:8080/creator/exercise/all?type=TranslatePol').subscribe(
      (data) => {
		  console.log(data);
		  this.exerciseList = data;
		  this.currentTypeName = "Przetłumacz ... na polski";
		  return data;
      },
	  () => {}
    ); 
	  
  }
  
  addExercise(exercise: any)
  {
	let data = this.chosenExercisesIndex.find(ob => ob['id'] === exercise.id);
	if(data === undefined)
	{
		this.chosenExercisesIndex.push({id: exercise.id, name: exercise.name});
	}
  }
  
  addType(typeId: number)
  {
	let data = this.chosenTypeIndex.find(ob => ob['id'] === typeId);
	if(data === undefined)
	{
		this.chosenTypeIndex.push({id: typeId});
	}
	this.httpClient.get('http://localhost:8080/creator/exercise/all?type='+typeId).subscribe(
		(data) => {
			console.log(data);
			this.exerciseList = data;
			return data;
		},
		() => {}
	  ); 
  }
  
  addTypeName(typeName: string)
  {
	this.currentTypeName = typeName;
  }
  
  deleteExercise(exerciseName: string)
  {
	let index: number = this.chosenExercisesIndex.findIndex(item => item.name === exerciseName);
	this.chosenExercisesIndex.splice(index, 1);
  }
  
  reset(form: NgForm) {
    form.reset();
	this.chosenExercisesIndex.length=0;
	this.httpClient.get('http://localhost:8080/creator/exercise/all?type=TranslatePol').subscribe(
      (data) => {
		  console.log(data);
		  this.exerciseList = data;
		  this.currentTypeName = "Przetłumacz ... na polski";
		  return data;
      },
	  () => {}
    ); 
  }
  
  create() {
	for(var i=0; i < this.chosenExercisesIndex.length; i++)
    {
	  this.tempArray[i]=this.chosenExercisesIndex[i].id;
    }
    const testModel: TestModel = {
	  name: this.testForm.value.testName,
	  timeLimit: this.testForm.value.testDuration,
	  exerciseIds: this.tempArray,
	};
	console.log(testModel);
    this.authService.createTest(testModel).subscribe (
      () => { alert('TEST ZOSTAŁ POPRAWNIE UTWORZONY I ZAPISANY'); },
	  () => { alert('WYSTĄPIŁ PROBLEM Z UTWORZENIEM TESTU, SPRAWDŹ SWOJE UPRAWNIENIA'); }
    );
  }
  
}
