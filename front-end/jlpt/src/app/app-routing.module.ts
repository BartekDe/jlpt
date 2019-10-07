import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProfilComponent} from "./profil/profil.component";
import {LessonsComponent} from "./lessons/lessons.component";
import {ResultsComponent} from "./results/results.component";
import {ExerciseWizardComponent} from "./exercise-wizard/exercise-wizard.component";
import {LessonWizardComponent} from "./lesson-wizard/lesson-wizard.component";
import {TestWizardComponent} from "./test-wizard/test-wizard.component";
import {LoginPanelComponent} from "./login-panel/login-panel.component";
import {RegisterPanelComponent} from "./register-panel/register-panel.component";


const routes: Routes = [
  //Konieczne będzie dodanie Guardsów - blokada przed wejściem na nie udostępnione dla konkretnego użytkownika dane
  //User
  {
    path: '',
    component: LoginPanelComponent
  },
  {
    path: 'profil',
    component: ProfilComponent
  },
  {
    path: 'lessons',
    component: LessonsComponent
  },
  {
    path: 'results',
    component: ResultsComponent
  },

  //Admin
  {
    path: 'exercise-wizard',
    component: ExerciseWizardComponent
  },
  {
    path: 'lesson-wizard',
    component: LessonWizardComponent
  },
  {
    path: 'test-wizard',
    component: TestWizardComponent
  },

  //Other
  {
    path: 'register-panel',
    component: RegisterPanelComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
