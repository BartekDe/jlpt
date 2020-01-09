import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RegisterModel} from './models/RegisterModel';
import {LoginModel} from './models/LoginModel';
import {ExerciseModel} from './models/ExerciseModel';
import {LessonModel} from './models/LessonModel';
import {TestModel} from './models/TestModel';
import {ExerciseAnswerModel} from './models/ExerciseAnswerModel';
import {ProfilModel} from './models/ProfilModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // role = '';
  isLogedIn = false;
  role =  'Admin';

  constructor(private httpClient: HttpClient) {}

  public saveToken(accessToken: string): void {
    localStorage.setItem('accessToken', accessToken);
    this.isLogedIn = true;
  }

  getToken(): string {
    return localStorage.getItem('accessToken');
  }

  registerUser(registerM: RegisterModel) {
    return this.httpClient.post('http://localhost:8080/auth/register', registerM);
  }

  login(loginModel: LoginModel) {
    return this.httpClient.post('http://localhost:8080/auth/login', loginModel);
  }

  sendAnswer(exerciseAnswerMode: ExerciseAnswerModel) {
    return this.httpClient.post('http://localhost:8080/lesson/solve-exercise', exerciseAnswerMode);
  }

  getRole() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + this.getToken()
      })
    };
    return this.httpClient.get('http://localhost:8080/auth/me', httpOptions).subscribe(
      (data) => {
        /* tslint:disable:no-string-literal */
        if (data['roles'].includes('ROLE_ADMIN')) { localStorage.setItem('isAdmin', 'true');
        } else { localStorage.setItem('isAdmin', 'false'); }
        /* tslint:enable:no-string-literal */
      });
  }

  public createExercise(exerciseM: ExerciseModel) {
    return this.httpClient.post('http://localhost:8080/creator/exercise', exerciseM);
  }

  public createLesson(lessonM: LessonModel) {
    return this.httpClient.post('http://localhost:8080/creator/lesson', lessonM);
  }

  public createTest(testM: TestModel) {
    return this.httpClient.post('http://localhost:8080/creator/test', testM);
  }

  public changeUsername(profilModel: ProfilModel) {
    return this.httpClient.post('http://localhost:8080/user/username', profilModel);
  }

  public changePassword(profilModel: ProfilModel) {
    return this.httpClient.post('http://localhost:8080/user/password', profilModel);
  }

  public deleteAccount() {
    return this.httpClient.post('http://localhost:8080/user', '');
  }

  public sendAlphabetScore(type: any){
     return this.httpClient.post('http://localhost:8080/creator/lesson/' + type + '/increase-success-count', '');
  }

}
