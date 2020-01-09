import { Component, OnInit } from '@angular/core';
import {FormBuilder, NgForm, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../auth.service';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';
import {LessonModel} from '../models/LessonModel';

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
  currentTypeName: string = '';
  base64Str: any;
  exerciseList: any;
  typeIndex = CONST_TYPE_CHOSE;
  chosenExercisesIndex = [];
  chosenTypeIndex = [];
  tempArray = [];

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
			  private httpClient: HttpClient) {
    this.lessonForm = this.formBuilder.group({
      lessonName: ['', Validators.required],
      longImageQuestion: ['', ]      
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
    const lessonModel: LessonModel = {
	  name: this.lessonForm.value.lessonName,
    theory: this.base64Str,
	  exerciseIds: this.tempArray,
	};
	console.log(lessonModel);
    this.authService.createLesson(lessonModel).subscribe (
      () => { alert('LEKCJA ZOSTAŁA POPRAWNIE UTWORZONA I ZAPISANA'); },
      () => { alert('WYSTĄPIŁ PROBLEM Z UTWORZENIEM LEKCJI, SPRAWDŹ SWOJE UPRAWNIENIA'); }
    );
  }
  
}
