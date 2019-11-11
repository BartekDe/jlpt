import { Component} from '@angular/core';
import {FormBuilder, NgForm, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-exercise-wizard',
  templateUrl: './exercise-wizard.component.html',
  styleUrls: ['./exercise-wizard.component.css']
})
export class ExerciseWizardComponent {
  exerciseForm: any;
  selectedFile: ImageSnippet;
  imgURL: string | ArrayBuffer;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService) {
    this.exerciseForm = this.formBuilder.group({
      questionType: ['', Validators.required],
      questionName: ['', Validators.required],
      question: ['', ],  longQuestion: ['', ],  imageQuestion: ['', ], longImageQuestion: ['', ],
      correctAnswer: ['', Validators.required],
      wrongAnswer1: ['', Validators.required],
      wrongAnswer2: ['', Validators.required],
      wrongAnswer3: ['', Validators.required],
      wrongAnswer4: ['', Validators.required],
      wrongAnswer5: ['', Validators.required]
    });
  }

  get f() { return this.exerciseForm.controls; }
  get questionType() {
    if (this.f.questionType.value !== 'DescribePict' && this.f.questionType.value !== 'ReadingCompTextPict') {
      this.imgURL = '';
    }
    return this.f.questionType.value;
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      /*this.authService.uploadImage(this.selectedFile.file).subscribe(
        (res) => {},
        (err) => {});*/
    });
    reader.readAsDataURL(file); // ++
    reader.onload = () => {
      this.imgURL = reader.result;
    };
  }

  reset(form: NgForm) {
    form.reset();
  }

  create() {
    console.log('questionType: ' + this.f.questionType.value + '\nquestionName: ' + this.f.questionName.value +
      '\nquestion: ' + this.f.question.value + '\nlongQuestion: ' + this.f.longQuestion.value +
      '\nimageQuestion: ' + this.f.imageQuestion.value + '\nlongImageQuestion: ' + this.f.longImageQuestion.value +
      '\ncorrectAnswer: ' + this.f.correctAnswer.value + '\nwrongAnswer1: ' + this.f.wrongAnswer1.value +
      '\nwrongAnswer2: ' + this.f.wrongAnswer2.value + '\nwrongAnswer3: ' + this.f.wrongAnswer3.value +
      '\nwrongAnswer4: ' + this.f.wrongAnswer4.value + '\nwrongAnswer5: ' + this.f.wrongAnswer5.value);
  }
}
