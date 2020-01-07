import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProfilComponent} from './profil/profil.component';
import {LessonsComponent} from './lessons/lessons.component';
import {ExercisesComponent} from './exercises/exercises.component';
import {DailyExercisesComponent} from './daily-exercises/daily-exercises.component';
import {TestExercisesComponent} from './test-exercises/test-exercises.component';
import {ResultsComponent} from './results/results.component';
import {ExerciseWizardComponent} from './exercise-wizard/exercise-wizard.component';
import {ExerciseViewComponent} from './exercise-view/exercise-view.component';
import {TestExerciseViewComponent} from './test-exercise-view/test-exercise-view.component';
import {LessonWizardComponent} from './lesson-wizard/lesson-wizard.component';
import {LessonViewComponent} from './lesson-view/lesson-view.component';
import {TestWizardComponent} from './test-wizard/test-wizard.component';
import {LoginPanelComponent} from './login-panel/login-panel.component';
import {RegisterPanelComponent} from './register-panel/register-panel.component';
import {AlphabetComponent} from './exercises/alphabet/alphabet.component';
import {TestsComponent} from './tests/tests.component';


const routes: Routes = [
  // Konieczne będzie dodanie Guardsów - blokada przed wejściem na nie udostępnione dla konkretnego użytkownika dane
  // User
  { path: '', component: LoginPanelComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'lessons', component: LessonsComponent },
  { path: 'lesson-view', component: LessonViewComponent },
  { path: 'tests', component: TestsComponent },
  { path: 'exercises', component: ExercisesComponent },
  { path: 'daily-exercises', component: DailyExercisesComponent },
  { path: 'test-exercises', component: TestExercisesComponent },
  { path: 'exercise-view', component: ExerciseViewComponent },
  { path: 'test-exercise-view', component: TestExerciseViewComponent },
  { path: 'exercises-hiragana', component: AlphabetComponent, data: { kana: 'Hiragana' } },
  { path: 'exercises-katakana', component: AlphabetComponent, data: { kana: 'Katakana' } },
  { path: 'exercises-kanji', component: AlphabetComponent, data: { kana: 'Kanji' } },
  { path: 'results', component: ResultsComponent },

  // Admin
  { path: 'exercise-wizard', component: ExerciseWizardComponent },
  { path: 'lesson-wizard', component: LessonWizardComponent },
  { path: 'test-wizard', component: TestWizardComponent },

  // Other
  { path: 'register-panel', component: RegisterPanelComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
