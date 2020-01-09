import { Component, OnInit } from '@angular/core';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lesson-view',
  templateUrl: './lesson-view.component.html',
  styleUrls: ['./lesson-view.component.css']
})

export class LessonViewComponent implements OnInit {
  pdfSrc: string | ArrayBuffer;
  totalPages: string;
  currentPage: number = 1;
  numberOfPages: number;
  scale: number = 0.5;
  pdf: PDFDocumentProxy;
  labelText: string;
  tempArray: any;
  
  constructor(private httpClient: HttpClient,
    private router: Router) {};
  
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

  ngOnInit() {
    this.httpClient.get('http://localhost:8080/creator/lesson/'+localStorage.getItem('lessonID')).subscribe(
      (data) => {
      console.log(data);
      this.tempArray = data;
      this.labelText = this.tempArray.name;
      this.pdfSrc = this.tempArray.theory;
		  return data;
      },
	  () => {
	  }
    ); 
    this.httpClient.post('http://localhost:8080/creator/lesson/theory/'+localStorage.getItem('lessonID'), '').subscribe(
      () => {},
      () => {});
  }

  checkExercise(name: string)
  {
    if(name === "Hiragana") this.router.navigate(['/exercises-hiragana']);
    else if(name === "Katakana") this.router.navigate(['/exercises-katakana']);
    else if(name === "Kanji") this.router.navigate(['/exercises-kanji']);
    else this.router.navigate(['/exercises']);
  }

}
