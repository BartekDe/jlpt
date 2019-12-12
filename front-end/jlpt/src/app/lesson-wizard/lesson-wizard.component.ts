import { Component, OnInit } from '@angular/core';
import {FormBuilder, NgForm, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../auth.service';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';
import {LessonTypeModel} from '../models/LessonTypeModel';
import {LessonModel} from '../models/LessonModel';


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
						
/*const CONST_TYPE_CHOSE = [{id: 1, name:'Przetłumacz ... na polski'}, 
						{id: 2, name:'Przetłumacz ... na hiragane'},
						{id: 3, name:'Przetłumacz ... na katakane'},
						{id: 4, name:'Przetłumacz ... na kanji'},
						{id: 5, name:'Wstaw odpowiednie słowo w ...'},
						{id: 6, name:'Uszereguj zdanie, wskaż które słowo znajdzie się w miejscu z *'},
						{id: 7, name:'Wstaw odpowiednie słowo w ... w dłuższym tekście'},
						{id: 8, name:'Czytanie ze zrozumieniem, odpowiedz na podstawie tekstu'},
						{id: 9, name:'Czytanie ze zrozumieniem i zdjęciem, odpowiedz na podstawie tekstu i zdjęcia'},
						{id: 10, name:'Napisz innymi słowami'},
						{id: 11, name:'Wskaż co przedstawia zdjęcie'}];*/
						
const CONST_TYPE_CHOSE = [{id: "TranslatePol", name:'Przetłumacz ... na polski'}, 
						{id: "TranslateHira", name:'Przetłumacz ... na hiragane'},
						{id: "TranslateKata", name:'Przetłumacz ... na katakane'},
						{id: "TranslateKanji", name:'Przetłumacz ... na kanji'},
						{id: "FillGap", name:'Wstaw odpowiednie słowo w ...'},
						{id: "OrderWords", name:'Uszereguj zdanie, wskaż które słowo znajdzie się w miejscu z *'},
						{id: "FillGapText", name:'Wstaw odpowiednie słowo w ... w dłuższym tekście'},
						{id: "ReadingCompText", name:'Czytanie ze zrozumieniem, odpowiedz na podstawie tekstu'},
						{id: "ReadingCompTextPict", name:'Czytanie ze zrozumieniem i zdjęciem, odpowiedz na podstawie tekstu i zdjęcia'},
						{id: "WriteInOtherWords", name:'Napisz innymi słowami'},
						{id: "DescribePict", name:'Wskaż co przedstawia zdjęcie'}];

@Component({
  selector: 'app-lesson-wizard',
  templateUrl: './lesson-wizard.component.html',
  styleUrls: ['./lesson-wizard.component.css']
})
export class LessonWizardComponent implements OnInit{
  lessonForm: any;
  pdfSrc: string | ArrayBuffer = "";
  totalPages: string;
  currentPage: number = 1;
  numberOfPages: number;
  scale: number = 0.5;
  pdf: PDFDocumentProxy;
  currentType: number = 0;
  currentTypeName: string = '';
  base64Str: any;
  exercise_list: any;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
			  private httpClient: HttpClient) {
    this.lessonForm = this.formBuilder.group({
      lessonName: ['', Validators.required],
      longImageQuestion: ['', ]      
    });
  }
  exercises_index = CONST_EXERCISES_CHOSE;
  type_index = CONST_TYPE_CHOSE;
  chosen_exercises_index = [];
  chosen_type_index = [];
  
  ngOnInit(){
	  const lessonTypeModel: LessonTypeModel = {
		exerciseType: 'TranslatePol',
	  }
	  console.log('DUPSKO!!!!!');
	  console.log(lessonTypeModel);
  this.httpClient.get('http://localhost:8080/creator/exercise/all?type=TranslatePol').subscribe(
  //this.exercise_list = this.httpClient.get('http://localhost:8080/creator/exercise/10').subscribe(
      (data) => {
		  console.log(data);
		  this.exercise_list = data;
		  return data;
      },
	  () => {
		  console.log(this.exercise_list);
	  }
    ); 
	  
  }
  
  addExercise(exercise: Object)
  {
	let data = this.chosen_exercises_index.find(ob => ob['id'] === exercise.id);
	if(data === undefined)
	{
		this.chosen_exercises_index.push({id: exercise.id, name: exercise.name});
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

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
	reader.onloadend = () => { this.base64Str = reader.result; };
    reader.readAsDataURL(file);
    reader.onload = () => {
	  this.pdfSrc= reader.result;
    };
  }
  
  callBackFn(pdf: PDFDocumentProxy) {
	this.numberOfPages = pdf.numPages;
  }
  
  zoomOut($event) {
	if(this.scale >= 0.2) this.scale -= 0.1;
  }
  
  zoomIn($event) {
	this.scale += 0.1;
  }
  
  changePageLeft($event) {
	this.totalPages = this.numberOfPages.toString();
	if(this.currentPage != 1) this.currentPage -= 1;
  }
  
  changePageRight($event) {
	this.totalPages = this.numberOfPages.toString();
	if(this.currentPage != this.numberOfPages) this.currentPage += 1;
  }
  

  reset(form: NgForm) {
	this.pdfSrc="";
	this.currentType=0;
	this.currentTypeName='';
    form.reset();
	this.chosen_exercises_index.length=0;
  }
  
  create() {
    const lessonModel: LessonModel = {
	  name: this.lessonForm.value.lessonName,
      contentPdf: this.base64Str,
	  exerciseList: this.chosen_exercises_index,
    };
    this.authService.createLesson(lessonModel).subscribe (
      () => { alert('LEKCJA ZOSTAŁA POPRAWNIE UTWORZONA I ZAPISANA'); },
      () => { alert('WYSTĄPIŁ PROBLEM Z UTWORZENIEM LEKCJI, SPRAWDŹ SWOJE UPRAWNIENIA'); }
    );
  }
  
}
