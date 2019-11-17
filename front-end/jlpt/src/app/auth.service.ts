import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RegisterModel} from './models/RegisterModel';
import {LoginModel} from './models/LoginModel';
import {ExerciseModel} from './models/ExerciseModel';

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

  public uploadImage(image: File) {
    const formData = new FormData();
    formData.append('image', image);

    return this.httpClient.post('/api/v1/image-upload', formData); // CHANGE
  }

  public createExercise(exerciseM: ExerciseModel) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + this.getToken()
      })
    };
    const dane = {
      name: 'nazwanazwKreatorCONST',
      type: 'TranslatePol',
      content: 'contentcontent2',
      contentImage: '',
      correctAnswer: 'correct2',
      answer1: 'wrong12',
      answer2: 'wrong22',
      answer3: 'wron32',
      answer4: 'wrong42',
      answer5: 'wrong52'
    };
    console.log('Bearer ' + this.getToken());
    console.log('Dane ' + dane.name);
    return this.httpClient.post('http://localhost:8080/creator/exercise', dane, httpOptions);
  }
}
