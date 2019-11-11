import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
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

  getToken(): string {
    return localStorage.getItem('accessToken');
  }

  login(loginModel: LoginModel) {
    return this.httpClient.post('http://localhost:8080/auth/login', loginModel);
  }

  getRole() {
    return this.httpClient.get('http://localhost:8080/auth/me').subscribe(
      (data) => {
        // {}.roles.contains('ROLE_ADMIN');
      });
  }

  public saveToken(accessToken: string): void {
    localStorage.setItem('accessToken', accessToken);
    this.isLogedIn = true;
  }

  registerUser(registerM: RegisterModel) {
    return this.httpClient.post('http://localhost:8080/auth/register', registerM);
  }

  public uploadImage(image: File) {
    const formData = new FormData();
    formData.append('image', image);

    return this.httpClient.post('/api/v1/image-upload', formData); // CHANGE
  }

  public createExercise(exerciseM: ExerciseModel) {
    return this.httpClient.post('http://localhost:8080/creator/exercise', exerciseM);
  }
}
