import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfilComponent } from './profil/profil.component';
import { LessonsComponent } from './lessons/lessons.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { DailyExercisesComponent } from './daily-exercises/daily-exercises.component';
import { TestExercisesComponent } from './test-exercises/test-exercises.component';
import { ResultsComponent } from './results/results.component';
import { ExerciseWizardComponent } from './exercise-wizard/exercise-wizard.component';
import { ExerciseViewComponent } from './exercise-view/exercise-view.component';
import { TestExerciseViewComponent } from './test-exercise-view/test-exercise-view.component';
import { LessonWizardComponent } from './lesson-wizard/lesson-wizard.component';
import { LessonViewComponent } from './lesson-view/lesson-view.component';
import { TestWizardComponent } from './test-wizard/test-wizard.component';
import { LoginPanelComponent } from './login-panel/login-panel.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { RegisterPanelComponent } from './register-panel/register-panel.component';
import {RequestInterceptor} from './RequestInterceptor';
import { AlphabetComponent } from './exercises/alphabet/alphabet.component';
import { TestsComponent } from './tests/tests.component';


@NgModule({
  declarations: [
    AppComponent,
    ProfilComponent,
    LessonsComponent,
    ExercisesComponent,
    DailyExercisesComponent,
    TestExercisesComponent,
    ResultsComponent,
    ExerciseWizardComponent,
    ExerciseViewComponent,
    TestExerciseViewComponent,
    LessonWizardComponent,
    LessonViewComponent,
    TestWizardComponent,
    LoginPanelComponent,
    RegisterPanelComponent,
    AlphabetComponent,
    TestsComponent
  ],
  imports: [
    BrowserModule,
    PdfViewerModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
