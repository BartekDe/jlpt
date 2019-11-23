import { Component} from '@angular/core';
import {FormBuilder, NgForm, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {ExerciseModel} from '../models/ExerciseModel';

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
  // selectedFile: ImageSnippet;
  imgURL: string | ArrayBuffer;
  base64Str: any;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {
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
    reader.onloadend = () => { console.log('READER: ', reader.result + '\n\n\n');
                               this.base64Str = reader.result;
                               console.log('BASE64: ', this.base64Str);
                               console.log('LENGTH: ', this.base64Str.length);
    };

    reader.readAsDataURL(file);
    reader.onload = () => { this.imgURL = reader.result; };
  }

  reset(form: NgForm) {
    form.reset();
  }

  create() {
    console.log('questionType: ' + this.f.questionType.value + '\nquestionName: ' + this.f.questionName.value +
      '\nquestion: ' + this.f.question.value + '\nlongQuestion: ' + this.f.longQuestion.value +

      '\nimageQuestion: ' + this.base64Str + '\nlongImageQuestion: ' + this.f.longImageQuestion.value +

      '\ncorrectAnswer: ' + this.f.correctAnswer.value + '\nwrongAnswer1: ' + this.f.wrongAnswer1.value +
      '\nwrongAnswer2: ' + this.f.wrongAnswer2.value + '\nwrongAnswer3: ' + this.f.wrongAnswer3.value +
      '\nwrongAnswer4: ' + this.f.wrongAnswer4.value + '\nwrongAnswer5: ' + this.f.wrongAnswer5.value);

    if (this.f.questionType.value === 'FillGapText' || this.f.questionType.value === 'ReadingCompText'
                                                    || this.f.questionType.value === 'ReadingCompTextPict') {
      this.f.question.value = this.f.longQuestion.value;
    }

    const exerciseModel: ExerciseModel = {
      name: this.f.questionName.value,
      type: this.f.questionType.value,
      content: this.f.question.value,
      contentImage: this.base64Str, // GOOD ??
      correctAnswer: this.f.correctAnswer.value,
      answer1: this.f.wrongAnswer1.value,
      answer2: this.f.wrongAnswer2.value,
      answer3: this.f.wrongAnswer3.value,
      answer4: this.f.wrongAnswer4.value,
      answer5: this.f.wrongAnswer5.value,
    };
    this.authService.createExercise(exerciseModel).subscribe (
      () => { alert('ĆWICZENIE ZOSTAŁO POPRAWNIE UTWORZONE I ZAPISANE'); },
      () => { alert('WYSTĄPIŁ PROBLEM Z UTWORZENIEM ĆWICZENIA, SPRAWDŹ SWOJE UPRAWNIENIA'); }
    );
  }
}
