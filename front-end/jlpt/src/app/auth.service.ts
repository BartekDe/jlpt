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

  public createExercise(exerciseM: ExerciseModel) {
    return this.httpClient.post('http://localhost:8080/creator/exercise', exerciseM);
  }
}
