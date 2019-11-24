import { Component, OnInit } from '@angular/core';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-lesson-view',
  templateUrl: './lesson-view.component.html',
  styleUrls: ['./lesson-view.component.css']
})
//const opinion = 0;
export class LessonViewComponent implements OnInit {
  pdfSrc: string | ArrayBuffer = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  totalPages: string;
  currentPage: number = 1;
  numberOfPages: number;
  scale: number = 0.5;
  pdf: PDFDocumentProxy;
  
  constructor() { }
  
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
  }

}
