import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import bootstrap from "bootstrap";
import { ProfilComponent } from './profil/profil.component';
import { LessonsComponent } from './lessons/lessons.component';
import { ResultsComponent } from './results/results.component';
import { ExerciseWizardComponent } from './exercise-wizard/exercise-wizard.component';
import { LessonWizardComponent } from './lesson-wizard/lesson-wizard.component';
import { TestWizardComponent } from './test-wizard/test-wizard.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfilComponent,
    LessonsComponent,
    ResultsComponent,
    ExerciseWizardComponent,
    LessonWizardComponent,
    TestWizardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
