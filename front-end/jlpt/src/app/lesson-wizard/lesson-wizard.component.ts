import { Component} from '@angular/core';
import {FormBuilder, NgForm, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

const CONST_EXERCISES_CHOSE = [{id: 1, name:'Ćwiczenie 1'}, 
						{id: 2, name:'Ćwiczenie 2'},
						{id: 3, name:'Ćwiczenie 3'},
						{id: 4, name:'Ćwiczenie 4'},
						{id: 5, name:'Ćwiczenie 5'},
						{id: 6, name:'Ćwiczenie 6'},
						{id: 7, name:'Ćwiczenie 7'},
						{id: 8, name:'Ćwiczenie 8'},
						{id: 9, name:'Ćwiczenie 9'},
						{id: 10, name:'Ćwiczenie 10'}];

@Component({
  selector: 'app-lesson-wizard',
  templateUrl: './lesson-wizard.component.html',
  styleUrls: ['./lesson-wizard.component.css']
})
export class LessonWizardComponent{
  lessonForm: any;
  selectedFile: ImageSnippet;
  pdfURL: string | ArrayBuffer;
  pdfSrc: string | ArrayBuffer = "";
  totalPages: string;
  currentPage: number = 1;
  numberOfPages: number;
  scale: number = 0.5;
  pdf: PDFDocumentProxy;
  
  //pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService) {
    this.lessonForm = this.formBuilder.group({
      lessonName: ['', Validators.required],
      longImageQuestion: ['', ]      
    });
  }
  exercises_index = CONST_EXERCISES_CHOSE;
  chosen_exercises_index = [];
  
  addExercise(exercise_name: string)
  {
	let data = this.chosen_exercises_index.find(ob => ob['name'] === exercise_name);
	if(data === undefined)
	{
		this.chosen_exercises_index.push({id: 1, name: exercise_name});
	}
  }
  
  deleteExercise(exercise_name: string)
  {
	let index: number = this.chosen_exercises_index.findIndex(item => item.name === exercise_name);
	this.chosen_exercises_index.splice(index, 1);
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    //reader.addEventListener('load', (event: any) => {
      //this.selectedFile = new ImageSnippet(event.target.result, file);
      /*this.authService.uploadImage(this.selectedFile.file).subscribe(
        (res) => {},
        (err) => {});*/
    //});
    reader.readAsDataURL(file); // ++
    reader.onload = () => {
      //this.pdfURL = reader.result;
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
	this.chosen_exercises_index.length=0;
  }
  

}
