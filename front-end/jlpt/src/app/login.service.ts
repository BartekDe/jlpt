import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginModel} from './models/LoginModel';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) {
  }

  login(loginModel: LoginModel) {
    return this.httpClient.post('http://localhost:8080/auth/login', loginModel);
  }
}
