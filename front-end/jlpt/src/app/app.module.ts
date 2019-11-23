import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfilComponent } from './profil/profil.component';
import { LessonsComponent } from './lessons/lessons.component';
import { ResultsComponent } from './results/results.component';
import { ExerciseWizardComponent } from './exercise-wizard/exercise-wizard.component';
import { LessonWizardComponent } from './lesson-wizard/lesson-wizard.component';
import { TestWizardComponent } from './test-wizard/test-wizard.component';
import { LoginPanelComponent } from './login-panel/login-panel.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { RegisterPanelComponent } from './register-panel/register-panel.component';
import {RequestInterceptor} from './RequestInterceptor';
import { HiraganaComponent } from './lessons/hiragana/hiragana.component';


@NgModule({
  declarations: [
    AppComponent,
    ProfilComponent,
    LessonsComponent,
    ResultsComponent,
    ExerciseWizardComponent,
    LessonWizardComponent,
    TestWizardComponent,
    LoginPanelComponent,
    RegisterPanelComponent,
    HiraganaComponent
  ],
  imports: [
    BrowserModule,
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
